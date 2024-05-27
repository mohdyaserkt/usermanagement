"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const addUser_controller_1 = __importDefault(require("./addUser.controller"));
const getUserById_controller_1 = __importDefault(require("./getUserById.controller"));
const getUsers_controller_1 = __importDefault(require("./getUsers.controller"));
const updateUser_controller_1 = __importDefault(require("./updateUser.controller"));
const deleteUser_controller_1 = __importDefault(require("./deleteUser.controller"));
const loginUser_controller_1 = __importDefault(require("./loginUser.controller"));
const getUsersCount_controller_1 = __importDefault(require("./getUsersCount.controller"));
const userControllers = (dependencies) => {
    return {
        addUserController: (0, addUser_controller_1.default)(dependencies),
        getUserByIdController: (0, getUserById_controller_1.default)(dependencies),
        updateUserController: (0, updateUser_controller_1.default)(dependencies),
        deleteUserController: (0, deleteUser_controller_1.default)(dependencies),
        loginUserController: (0, loginUser_controller_1.default)(dependencies),
        getUsersController: (0, getUsers_controller_1.default)(dependencies),
        getUsersCountController: (0, getUsersCount_controller_1.default)(dependencies),
    };
};
exports.default = userControllers;
