import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const TypeOrmConfig: TypeOrmModuleOptions = {
    // database initalization
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    cache: {
        type: "redis",
        options: {
            host: "localhost",
            port: 6379
        },
        ignoreErrors: true
    },
    extra: {
        max: 10,
        connectionTimeoutMillis: 2000
    }
};
  