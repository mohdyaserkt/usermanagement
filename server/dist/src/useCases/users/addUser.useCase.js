"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../../entities");
const createUser = (dependencies) => {
    const { usersRepository } = dependencies;
    if (!usersRepository) {
        throw new Error('The users repository should exist in dependencies');
    }
    const execute = (params) => {
        const { name, emailId, password, gender, } = params;
        const user = new entities_1.User({ name, password, gender, emailId });
        return usersRepository.add(user);
    };
    return {
        execute
    };
};
exports.default = createUser;
