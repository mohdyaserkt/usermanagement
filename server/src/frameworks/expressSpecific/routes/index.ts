import express, { Router } from 'express';
import usersRouter from './user';


interface Dependencies {
    useCases: {
        user: {
            addUserUseCase: any,
            getUserByIdUseCase:any,
            getUsersUseCase:any,
            updateUserUseCase:any,
            deleteUserUseCase:any,
            loginUserUseCase:any,
            getUsersCountUseCase:any,

             // Define the appropriate type for addUserUseCase
        }
    }
}

const createRoutes = (dependencies: Dependencies): Router => {
    const routes = Router();

    const users = usersRouter(dependencies);
 

    routes.use('/users', users);


    return routes;
};

export default createRoutes;
