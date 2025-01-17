import { Context, Hono } from "hono";

import { generateSha256Hash, createPrismaClient } from '../index';
import { PrismaClient } from "@prisma/client/edge";
import { ENV, JWTPayload } from "../types";
import { Blog } from "@prisma/client/edge";
import { verify, jwt } from "hono/jwt";
import type { SignatureKey } from "hono/utils/jwt/jws";
import { HTTPException } from "hono/http-exception";
import { RegExpRouter } from "hono/router/reg-exp-router";


const blogRouter = new Hono<ENV>({
    router: new RegExpRouter()
});


// Create error middleware
blogRouter.onError((err, c) => {
    // Handle JWT verification errors

    console.log("--------------------Error Route Start--------------------");
    // console.log(err?.message)
    // console.log("--------------------Error Cause--------------------")
    // console.log(err?.cause)
    // console.log("--------------------Error Name--------------------")
    // console.log(err?.name)
    // console.log("--------------------Error Stack--------------------")
    // console.log(err?.stack)
    
    if (err instanceof HTTPException) {
        if (err.message === 'Unauthorized') {
            return c.json({
                error: 'Authentication failed',
                message: 'Invalid or missing token'
            }, 401)
        }
        return c.json({
            error: err.message,
            status: err.status
        }, err.status)
    }
    
    // Handle any other errors
    console.error('Server error:', err);
    console.log("--------------------Error Route End--------------------");

    return c.json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
    }, 500)
})

blogRouter.use('*', (c, next) => jwt({
    secret: c.env.JWT_SECRET
})(c, next))

blogRouter.use('*', async (c, next) => {
    const payload: JWTPayload = c.get('jwtPayload');
    c.set('data', payload);
    console.log(payload);
    console.log(c.req.url);
    console.log(c.req.path);
    await next()
})

blogRouter.post('/', async (c) => {
    console.log("post endpoint ----- ");
    const body:Blog = await c.req.json();
    const db = c.var.db;
    const userId = c.get("jwtPayload").id;

    console.log(body, userId);

    try {
        const blog = await db.blog.create({
            data: {
                userId: userId,
                title: body.title,
                content: body.content,
                comments: body?.comments,
            }
        });

        if (!blog) {
            return c.json({
                error: 'Something went wrong...Databse error'
            }, 500)
        }
        console.log(blog);
        return c.json(blog, 200);
    } catch (error) {
        console.error(error);
        return c.json({
            error: "internal server error"
        }, 500);
    }
    // return c.text("");
})

blogRouter.put(`/`, async (c) => {
    const body:Blog = await c.req.json();
    const db = c.var.db;
    const userId = c.get("jwtPayload").id;

    console.log(body, userId);

    try {
        const blog = await db.blog.update({
            where: {
                id: body.id
            },
            data: {
                // userId: userId,  // since a blog posted by one user will not be transfereed to another, updating this is invalid.
                title: body.title,
                content: body.content,
                comments: body?.comments,
                deleted: body?.deleted || false,
            }
        });

        if (!blog) {
            return c.json({
                error: 'Something went wrong...Databse error'
            }, 500)
        }
        console.log(blog);
        return c.json(blog, 200);
    } catch (error) {
        console.error(error);
        return c.json({
            error: "internal server error"
        }, 500);
    }
})


blogRouter.get(`/:id`, async (c) => {
    // const prisma = c.get('prismaClient')
    const paramId = c.req.param('id');
    console.log(c.get("data"));
    const payload = c.get('jwtPayload')
    console.log(payload);
    const db = c.var.db;
    try {
        const blog = await db.blog.findUnique({
            where: {
                id: paramId
            },
            cacheStrategy: {
                swr: 30,
                ttl: 60
            }
        })

        console.log(blog);

        if (!blog) {
            c.status(404);
            return c.json({
                error: `Blog with id - ${paramId} not found.`
            })
        }

        return c.json(blog, 200);
    } catch (error) {
        console.error(error);
        c.status(500);
        return c.text("Internal Server Error");
    }
    return c.text(`Hello from - ${c.req.path}`);
})

export default blogRouter;