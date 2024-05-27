"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../../controllers");
const userRoutes = (dependencies) => {
    const router = (0, express_1.Router)();
    const { addUserController, getUserByIdController, updateUserController, deleteUserController, loginUserController, getUsersController, getUsersCountController } = (0, controllers_1.userControllers)(dependencies);
    router.route('/').post(addUserController).delete(deleteUserController).put(updateUserController).get(getUsersController);
    router.route('/count').get(getUsersCountController);
    // router.route('/:id').get(getUserByIdController);
    router.route('/login').post(loginUserController);
    return router;
};
exports.default = userRoutes;
