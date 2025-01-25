import { Hono, Next, Context } from "hono";
import { sign, verify } from "hono/jwt";

import { generateSha256Hash } from '../index';
import { ENV, User } from "../types";
import { signinInput, signupInput } from '@nikhilcbhat021/medium-common'
import { ZodObject } from "zod";
// import * as configs from '../config.json';

const app = new Hono<ENV>();


const zodValidator = async (zodObj:ZodObject<{}>, c:Context<ENV>, next:Next) => {
    const body = await c.req.json();
    const zodValidation = zodObj.safeParse(body);

    console.log("Inside zodvalidator")
    if (!zodValidation.success) {
        const errorStr = zodValidation.error.issues.reduce((prevStr, currErr, idx) => {
            return prevStr+
                `Input - '${currErr.path}' --- expected: ${currErr?.expected} , received: ${currErr?.received}. ${currErr.message}\n`
        }, "")
        console.error(errorStr);
        return c.json({
            error: `Input validations failed. Error :: ${errorStr}`,
        }, 401)
    }

    await next();
}


app.post(`/signup`, async (c, next) => await zodValidator(signupInput, c, next), async (c) => {

    const db = c.get('db');
    console.log(c.env.JWT_SECRET);
    const body = await c.req.json();

    try {
        const hashHex = await generateSha256Hash(body.password);
        const ret = await db.user.create({
            data: {
                email: body.email,
                password: hashHex,
                name: body?.name
            },
            select: {
                email: true,
                name: true
            }
            /**
             * Use the below cacheStrategy to cache the response incase of find and few other queries.
             * 
             * cacheStrategy: {
             *  swr: 30,
             *  ttl: 60
             * }
            */
        })
        if (!ret) {
            console.log('ret is false');
            return c.json({error: 'DB Error'}, 500);
        }
        console.log(ret);
        return c.text(`Hello from - ${c.req.path}. We need to redirect to login route if successfully Signed-Up. Further we can do email-verification etc`);
    } catch (err: any) {
        console.error(Object.keys(err));
        console.error('------')
        console.error(err?.name)
        console.error('------')

        if (err?.code === 'P2002') {
            return c.text("User already exists", 403);
        }

        return c.json({error: err?.message}, 500);

    }
})

app.post(`/signin`, async (c, next) => await zodValidator(signinInput, c, next), async (c) => {
    const db = c.get('db');

    try {
        const body: User = await c.req.json();
        const hashedIncomingPass = await generateSha256Hash(body.password);
        const userDetails = await db.user.findUnique({
            where: {
                email: body.email,
                password: hashedIncomingPass
            }, cacheStrategy: {
                swr: 30,
                ttl: 60
            }, select: {
                email: true,
                id: true,
                name: true,
                blogs: true
            }
        });

        console.log(userDetails)

        if (!userDetails) {
            return c.json({error: "Username or Password is incorrect"}, 403);
        }

        const token = await sign({email:userDetails.email, id: userDetails.id}, c.env.JWT_SECRET)
        console.log(token);

        return c.json({success:true, token: token});
    } catch (error) {
        console.error(error);
        return c.status(403);
    }
})

export default app;