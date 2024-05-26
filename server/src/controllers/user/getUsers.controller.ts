import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response } from '../../frameworks/common';

interface Dependencies {
    useCases: {
        user: {
            getUsersUseCase: any; // Define the appropriate type for getUserByIdUseCase
        }
    }
}

const getUsersController = (dependencies: Dependencies) => {
    const {
        useCases: {
            user: { getUsersUseCase }
        }
    } = dependencies;

    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
           

            const getUsers = getUsersUseCase(dependencies);
            const response = await getUsers.execute();

            res.json(new Response({
                status: true,
                content: response
            }));

            next();
        } catch (err) {
            next(err);
        }
    };
};

export default getUsersController;
