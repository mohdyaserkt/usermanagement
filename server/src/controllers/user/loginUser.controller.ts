import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response ,ResponseError} from '../../frameworks/common';
import { generateToken } from '../../entities/user';
import jwt  from 'jsonwebtoken';

interface Dependencies {
  useCases: {
    user: {
      loginUserUseCase: any; // Define the appropriate type for updateUserUseCase
    };
  };
}

const loginUserController = (dependencies: Dependencies) => {
  const {
    useCases: {
      user: { loginUserUseCase },
    },
  } = dependencies;

  return async (req: Request, res: ExpressResponse, next: NextFunction) => {
    try {
      const { body = {} } = req;

      const { emailId, password } = body;

      const loginUser = loginUserUseCase(dependencies);
      const response = await loginUser.execute({ emailId, password });
      console.log(response,"check");
      
      
      if (response.status) {
        const token = generateToken(JSON.parse(JSON.stringify(response?.user)))
        res.status(200).json(
          new Response({
            status: true,
            content: {token},
          })
        );
      } else {
        
        res.status(response?.errorDetails?.status).json(
            new ResponseError({
              status:response?.errorDetails?.status,
              msg:response?.errorDetails?.msg,
              reason:response?.errorDetails?.reason,
              ip:"127.0.0.1",
              url:"/api/v1/userlogin"

            })
          );

      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default loginUserController;
