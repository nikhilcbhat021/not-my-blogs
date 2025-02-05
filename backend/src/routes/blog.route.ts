import { Hono, Next, Context } from "hono";

import { ENV, JWTPayload } from "../types";
import { Blog } from "@prisma/client/edge";
import { jwt } from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import z, { ZodObject } from 'zod';
import { postBlogInput, blogUpdateInput, UpdateBlogType, PostBlogType } from '@nikhilcbhat021/medium-common'
import { createMiddleware } from "hono/factory";
// import { signupInput, postBlogInput } from '../../../common/src/index';

const blogRouter = new Hono<ENV>();

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


blogRouter.get('/bulk', async(c) => {

    // const payload = c.get('jwtPayload')
    // console.log(payload);
    const db = c.var.db;
    try {
        const blogs = await db.blog.findMany({
            where: {    
                deleted: false,
                // userId: payload.id
            },
            include: {
                author: {
                    select: {
                        name: true,
                    }
                }
            },
            cacheStrategy: {
                swr: 30,
                ttl: 60
            }
        })

        console.log(blogs);

        if (!blogs.length) {
            c.status(404);
            return c.json({
                error: `No Blogs found`
            })
        }

        return c.json({count: blogs.length , blogs: blogs}, 200);
    } catch (error) {
        console.error(error);
        c.status(500);
        return c.text("Internal Server Error");
    }
})

blogRouter.use('*', (c, next) => jwt({
    secret: c.env.JWT_SECRET
})(c, next))

blogRouter.use('*', async (c, next) => {
    const payload: JWTPayload = c.get('jwtPayload');
    c.set('data', payload);
    console.error("Middleware blogs");
    // c.set('zodObject', );
    // console.log(payload);
    // console.log(c.req.url);
    // console.log(c.req.path);
    await next()
})

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

blogRouter.post('/', async (c, next) => await zodValidator(postBlogInput, c, next), async (c) => {
    console.log("post endpoint ----- ");
    const body = await c.req.json();

    const db = c.var.db;
    const userId = c.get("jwtPayload").id;

    console.log(body, userId);

    try {
        const blog = await db.blog.create({
            data: {
                userId: userId,
                title: body.title,
                content: body.content,
                // comments: body?.comments,    // Comments can be given to a blog ONLY after its posted, not along when its posted.
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

blogRouter.put(`/`, (c, next) => zodValidator(blogUpdateInput, c, next), async (c) => {
    const body = await c.req.json();
    const db = c.var.db;
    const userId = c.get("jwtPayload").id;

    console.log(body, userId);

    if (!body.title && !body.content && !body.deleted && !body.comments?.length) {
        return c.json({
            message: 'Nothing to update, everything is same.'
        }, 409)
    }

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
            include: {
                author: {
                    select: {
                        name: true
                    }
                }
            },
            cacheStrategy: {
                swr: 30,
                // ttl: 60
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
})

export default blogRouter;