import { createMiddleware } from "hono/factory";
import { ENV } from "../types";

const zodValidator = createMiddleware<ENV>(async (c, next) => {
    c.req;
    await next();
})