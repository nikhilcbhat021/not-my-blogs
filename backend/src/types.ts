import { Blog } from '@prisma/client';
import { createPrismaClient } from './index';
import { JwtVariables } from 'hono/jwt'

// Define the JWT payload type
export interface JWTPayload {
    id: string;
    email: string;
}

export interface User extends JWTPayload {
    name: string;
    blogs?: Blog[];
    password: string;
}

export interface Blog {
    id: string;
    title: string;
    content: string;
    comments: string[];
    deleted: boolean;
    userId: string;
}

export interface ENV {
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }, Variables: {
        db: ReturnType<typeof createPrismaClient>,
        log: string,
        data: JWTPayload,
    }
}
