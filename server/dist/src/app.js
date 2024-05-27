"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./frameworks/expressSpecific/routes"));
const dependencies_1 = __importDefault(require("./config/dependencies"));
const ErrorHandler_1 = __importDefault(require("./frameworks/expressSpecific/ErrorHandler"));
const mongo_1 = require("./frameworks/database/mongo");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';
const start = () => {
    // Middlewares
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Routes
    app.use(API_PREFIX, (0, routes_1.default)(dependencies_1.default));
    // Common Error handler
    app.use((err, req, res, next) => {
        (0, ErrorHandler_1.default)(err, req, res, next);
    });
    app.listen(PORT, () => {
        console.log(`WOHOOO our server is running under port ${PORT}`);
        (0, mongo_1.connect)();
    });
};
exports.start = start;
