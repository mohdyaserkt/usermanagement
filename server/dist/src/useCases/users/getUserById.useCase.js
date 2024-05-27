"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUserById = (dependencies) => {
    const { usersRepository } = dependencies;
    if (!usersRepository) {
        return new Error('The users repository should exist in dependencies');
    }
    const execute = ({ id }) => {
        return usersRepository.getById(id);
    };
    return {
        execute
    };
};
exports.default = getUserById;
