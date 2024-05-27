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
const entities_1 = require("../../entities");
const loginUser = (dependencies) => {
    const { usersRepository } = dependencies;
    if (!usersRepository) {
        throw new Error('The users repository should exist in dependencies');
    }
    const execute = (params) => __awaiter(void 0, void 0, void 0, function* () {
        const { emailId, password } = params;
        let errorDetails = {
            status: 0,
            msg: '',
            reason: '',
        };
        const useData = yield usersRepository.getByEmail(emailId);
        if (!useData) {
            errorDetails.msg = 'Login failed User does not exist please signup';
            errorDetails.reason = 'User does not exist';
            errorDetails.status = 404;
        }
        else {
            const pasStatus = yield (0, entities_1.comparePasswords)(password, useData.password);
            if (pasStatus) {
                const user = yield usersRepository.countInc(useData._id);
                return { status: pasStatus, user };
            }
            else {
                errorDetails.msg = 'Login failed password Incorrect';
                errorDetails.reason = 'Password incorrect';
                errorDetails.status = 401;
            }
        }
        return { status: false, errorDetails };
    });
    return {
        execute,
    };
};
exports.default = loginUser;
