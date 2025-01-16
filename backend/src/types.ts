import { createPrismaClient } from './index';

export type ENV = {
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }, Variables: {
        db: ReturnType<typeof createPrismaClient>,
        log: string,
    }
}
