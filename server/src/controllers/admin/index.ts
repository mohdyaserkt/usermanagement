
import loginAdminController from './loginAdmin.controller'; 

interface Dependencies {
    useCases: {
        
        admin:{
            loginAdminUseCase:any
        }
    }
}

const adminControllers = (dependencies: Dependencies) => {
    return {
        loginAdminController: loginAdminController(dependencies)
    };
};

export default adminControllers;
