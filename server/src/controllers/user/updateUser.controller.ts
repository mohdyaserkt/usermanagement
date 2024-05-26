import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response } from '../../frameworks/common';

interface Dependencies {
    useCases: {
        user: {
            updateUserUseCase: any; // Define the appropriate type for updateUserUseCase
        }
    }
}

const updateUserController = (dependencies: Dependencies) => {
    const {
        useCases: {
            user: { updateUserUseCase }
        }
    } = dependencies;

    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
            const { body = {} } = req;

            const { id, name, lastName, gender, meta } = body;

            const updateUser = updateUserUseCase(dependencies);
            const response = await updateUser.execute({
                user: {
                    id,
                    name,
                    lastName,
                    gender,
                    meta
                }
            });

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

export default updateUserController;
