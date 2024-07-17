"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./opentelemetry");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const cookie_1 = require("@fastify/cookie");
const session_1 = require("@fastify/session");
const path_1 = require("path");
const static_1 = require("@fastify/static");
const microservices_1 = require("@nestjs/microservices");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    app.setGlobalPrefix('api');
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'main_queue',
            queueOptions: {
                durable: false,
            },
        },
    });
    await app.startAllMicroservices();
    app.register(static_1.fastifyStatic, {
        root: (0, path_1.join)(__dirname, '..', 'public'),
        prefix: '/public/',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The API documentation')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
    }, 'access-token')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customJs: '/public/swagger-custom.js',
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.register(cookie_1.default, {
        secret: "a very long and complex secret key",
        parseOptions: {}
    });
    app.register(session_1.default, {
        secret: 'a very long and complex secret key',
        cookie: {
            secure: true,
        },
        saveUninitialized: false,
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map