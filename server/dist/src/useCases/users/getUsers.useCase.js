"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUsers = (dependencies) => {
    const { usersRepository } = dependencies;
    if (!usersRepository) {
        return new Error('The users repository should exist in dependencies');
    }
    const execute = () => {
        return usersRepository.getUsers();
    };
    return {
        execute
    };
};
exports.default = getUsers;
