"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("./user"));
const createRoutes = (dependencies) => {
    const routes = (0, express_1.Router)();
    const users = (0, user_1.default)(dependencies);
    routes.use('/users', users);
    return routes;
};
exports.default = createRoutes;
