//lib imports
import { Hono } from 'hono'

// local imports
import * as configs from './config.json';
import authRouter from './routes/auth.route';
import blogRouter from './routes/blog.route';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { ENV } from './types';

import { cors } from 'hono/cors';
/**
 * Constants and Helper Functions
 * 
 *          START
 */

export const generateSha256Hash = async (data: string) => { //:Promise<String>
    const encodedPass = new TextEncoder().encode(data);

    const hashedPass = await crypto.subtle.digest({
        name: "SHA-256"
    }, encodedPass);

    console.log(hashedPass);
    const hashHex = [...new Uint8Array(hashedPass)].map((b) => b.toString(16).padStart(2, "0")).join("");
    console.log(hashHex);

    return hashHex;
}

export function createPrismaClient(databaseUrl: string) {
    return new PrismaClient({
        datasourceUrl: databaseUrl,
    })
    .$extends({
        query: {
            $allOperations({ operation, args, query }) {
                console.log(`Query: ${operation} - ${args}`);
                return query(args)
            }
        }
    })
    .$extends(withAccelerate())
}

/**
 * Constants and Helper Functions 
 * 
 *             END
 */


const app = new Hono<ENV>();

/**
 * MIDDLEWARES  START
 */

// logger middleware
app.use(cors());
app.use('*', async (c, next) => {
    console.log(`Hello from - Index.js Root Middleware`);
    const prisma = createPrismaClient(c.env.DATABASE_URL);
    
    c.set('db', prisma);
    c.set('log', 'Hi');
    await next();
    console.log("path - " + c.req.url);
})


// ROUTES START
app.get('/', (c) => {
    return c.text('Hello Hono!')
})

app.route(`${configs.apiv1}/auth`, authRouter);
app.route(`${configs.apiv1}/blogs`, blogRouter);


export default app;
