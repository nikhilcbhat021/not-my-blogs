import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

import { generateSha256Hash } from '../index';
import { ENV, User } from "../types";
// import * as configs from '../config.json';

const app = new Hono<ENV>();


app.post(`/signup`, async (c) => {

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
        console.log(ret);
        return c.text(`Hello from - ${c.req.path}. We need to redirect to login route if successfully Signed-Up. Further we can do email-verification etc`);
    } catch (error) {
        console.error(error);
        return c.status(403);
    }
})

app.post(`/signin`, async (c) => {
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
            c.status(403);
            return c.json({error: "user not found"});
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