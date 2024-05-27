"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteUser = (dependencies) => {
    const { usersRepository } = dependencies;
    if (!usersRepository) {
        throw new Error('The users repository should exist in dependencies');
    }
    const execute = ({ user = {} }) => {
        return usersRepository.delete(user);
    };
    return {
        execute
    };
};
exports.default = deleteUser;
