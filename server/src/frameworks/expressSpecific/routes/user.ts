import express, { Router } from 'express';
import { userControllers } from '../../../controllers';

interface Dependencies {
    useCases: {
        user: {
            addUserUseCase: any,
            getUserByIdUseCase:any,
            updateUserUseCase:any,
            deleteUserUseCase:any,
            loginUserUseCase:any,
            getUsersUseCase:any,
            getUsersCountUseCase:any,
             // Define the appropriate type for addUserUseCase
        }
    }
}

const userRoutes = (dependencies: Dependencies): Router => {
    const router = Router();
    const {
        addUserController,
        getUserByIdController,
        updateUserController,
        deleteUserController,
        loginUserController,
        getUsersController,
        getUsersCountController
    } = userControllers(dependencies);

    router.route('/').post(addUserController).delete(deleteUserController).put(updateUserController).get(getUsersController);
    router.route('/count').get(getUsersCountController);
    // router.route('/:id').get(getUserByIdController);
    router.route('/login').post(loginUserController);

    return router;
};

export default userRoutes;
