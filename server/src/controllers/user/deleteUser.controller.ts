import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response } from '../../frameworks/common';

interface Dependencies {
    useCases: {
        user: {
            deleteUserUseCase: any; // Define the appropriate type for deleteUserUseCase
        }
    }
}

const deleteUserController = (dependencies: Dependencies) => {
    const {
        useCases: {
            user: { deleteUserUseCase }
        }
    } = dependencies;

    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
            const { body = {} } = req;

            const { id, name, lastName, gender, meta } = body;

            const deleteUser = deleteUserUseCase(dependencies);
            const response = await deleteUser.execute({
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

export default deleteUserController;
