"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginAdmin_controller_1 = __importDefault(require("./loginAdmin.controller"));
const adminControllers = (dependencies) => {
    return {
        loginAdminController: (0, loginAdmin_controller_1.default)(dependencies)
    };
};
exports.default = adminControllers;
