import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { Response } from '../../frameworks/common';
import bcrypt from "bcrypt";
import { generateToken } from '../../entities/user';

interface Dependencies {
    useCases: {
        user: {
            addUserUseCase: any; // Define the appropriate type for addUserUseCase
        }
    }
}

const addUserController = (dependencies: Dependencies) => {
    const {
        useCases: {
            user: { addUserUseCase }
        }
    } = dependencies;

    return async (req: Request, res: ExpressResponse, next: NextFunction) => {
        try {
            const { body = {} } = req;

            const {name, gender, password,emailId } = body;
            const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

            const addUser = addUserUseCase(dependencies);
            let response = await addUser.execute({
                password:hashedPassword,
                name,
                emailId,
                gender,
                
            });
            const token = generateToken(JSON.parse(JSON.stringify(response)));

           

            res.json(new Response({
                status: true,
                content: {token},
            }));

            next();
        } catch (err) {
            console.log("iam worked");
            
            next(err);
        }
    };
};

export default addUserController;
