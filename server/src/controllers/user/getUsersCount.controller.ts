import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response } from '../../frameworks/common';

interface Dependencies {
    useCases: {
        user: {
            getUsersCountUseCase: any; // Define the appropriate type for getUserByIdUseCase
        }
    }
}

const getUsersCountController = (dependencies: Dependencies) => {
    const {
        useCases: {
            user: { getUsersCountUseCase }
        }
    } = dependencies;

    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
            
            

            const getUsersCount = getUsersCountUseCase(dependencies);
            const response = await getUsersCount.execute();

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

export default getUsersCountController;
