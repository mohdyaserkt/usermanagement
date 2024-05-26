import addUserController from './addUser.controller';
import getUserByIdController from './getUserById.controller';
import getUsersController from './getUsers.controller';
import updateUserController from './updateUser.controller';
import deleteUserController from './deleteUser.controller';
import loginUserController from './loginUser.controller'; 
import getUsersCountController from './getUsersCount.controller'; 

interface Dependencies {
    useCases: {
        user: {
            addUserUseCase: any,
            getUserByIdUseCase:any,
            updateUserUseCase:any,
            deleteUserUseCase:any,
            loginUserUseCase:any,
            getUsersUseCase:any,
            getUsersCountUseCase:any

             // Define the appropriate type for addUserUseCase
        }
    }
}

const userControllers = (dependencies: Dependencies) => {
    return {
        addUserController: addUserController(dependencies),
        getUserByIdController: getUserByIdController(dependencies),
        updateUserController: updateUserController(dependencies),
        deleteUserController: deleteUserController(dependencies),
        loginUserController: loginUserController(dependencies),
        getUsersController: getUsersController(dependencies),
        getUsersCountController: getUsersCountController(dependencies),
        
    };
};

export default userControllers;
