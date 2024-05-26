import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response } from '../../frameworks/common';

interface Dependencies {
    useCases: {
        user: {
            getUserByIdUseCase: any; // Define the appropriate type for getUserByIdUseCase
        }
    }
}

const getUserByIdController = (dependencies: Dependencies) => {
    const {
        useCases: {
            user: { getUserByIdUseCase }
        }
    } = dependencies;

    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
            const { params = {} } = req;
            const { id } = params;

            const getUserById = getUserByIdUseCase(dependencies);
            const response = await getUserById.execute({ id });

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

export default getUserByIdController;
