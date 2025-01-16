import { Hono } from "hono";

import { Env } from "hono";
import { generateSha256Hash, createPrismaClient } from '../index';
import { PrismaClient } from "@prisma/client/edge";
import { ENV } from "../types";

const app = new Hono<ENV>();


app.use('/*', async(c, next) => {
    console.log(`In blogrouter middleware. Path = ${c.req.path}`);
    const retjson = await c.json({})
    await next();
})

app.post(`/`, async (c) => {
    return c.text(`Hello from - ${c.req.path}`);
})
app.put(`/`, async (c) => {
    
    return c.text(`Hello from - ${c.req.path}`);
})
app.get(`/:id`, async (c) => {
    // const prisma = c.get('prismaClient')
    console.log(c.req.param('id'));
    return c.text(`Hello from - ${c.req.path}`);
})

export default app;