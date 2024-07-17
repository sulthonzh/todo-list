"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const serverless_express_1 = require("@vendia/serverless-express");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
let cachedServer;
const bootstrapServer = async () => {
    const expressApp = express();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
    await app.init();
    return (0, serverless_express_1.default)({ app: expressApp });
};
const handler = async (event, context) => {
    if (!cachedServer) {
        cachedServer = await bootstrapServer();
    }
    return cachedServer(event, context);
};
exports.handler = handler;
//# sourceMappingURL=netlify-handler.js.map