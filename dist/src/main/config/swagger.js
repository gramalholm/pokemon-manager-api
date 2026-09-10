"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const setupSwagger = (app) => {
    const swaggerFile = path_1.default.resolve(__dirname, 'swagger-output.json');
    if (fs_1.default.existsSync(swaggerFile)) {
        const swaggerDocument = JSON.parse(fs_1.default.readFileSync(swaggerFile, 'utf8'));
        app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    }
    else {
        console.warn('⚠️ Arquivo swagger-output.json não encontrado. Execute "npm run swagger".');
    }
};
exports.setupSwagger = setupSwagger;
