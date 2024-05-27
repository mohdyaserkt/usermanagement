import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response ,ResponseError} from '../../frameworks/common';
import { generateToken } from '../../entities/user';

interface Dependencies {
  useCases: {
    admin: {
        loginAdminUseCase: any; // Define the appropriate type for updateUserUseCase
    };
  };
}

const loginAdminController = (dependencies: Dependencies) => {
  const {
    useCases: {
      admin: { loginAdminUseCase },
    },
  } = dependencies;

  return async (req: Request, res: ExpressResponse, next: NextFunction) => {
    try {
      const { body = {} } = req;

      const { emailId, password } = body;

      const loginAdmin = loginAdminUseCase(dependencies);
      const response = await loginAdmin.execute({ emailId, password });
      
      if (response) {
        res.status(200).json(
          new Response({
            status: true,
            content: {},
          })
        );
      } else {
        
        res.status(response?.errorDetails?.status).json(
            new ResponseError({
              status:401,
              msg:'Login failed Invalid Credentials',
              reason:'Invalid Credentials',
              ip:"127.0.0.1",
              url:"/api/v1/adminlogin"

            })
          );

      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default loginAdminController;
