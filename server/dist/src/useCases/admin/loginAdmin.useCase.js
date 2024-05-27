"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginAdmin = (dependencies) => {
    const { usersRepository } = dependencies;
    if (!usersRepository) {
        throw new Error('The users repository should exist in dependencies');
    }
    const execute = (params) => __awaiter(void 0, void 0, void 0, function* () {
        const { emailId, password } = params;
        return emailId == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD;
    });
    return {
        execute,
    };
};
exports.default = loginAdmin;
