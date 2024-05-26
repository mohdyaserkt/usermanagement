import { User } from '../../entities';

interface UserDependencies {
    usersRepository: any; // Adjust this type according to your repository interface/type
}

interface CreateUserParams {
    name: string;
    gender: number;
    password:  string ;
    emailId:  string;
    
}

const createUser = (dependencies: UserDependencies) => {
    const { usersRepository } = dependencies;

    if (!usersRepository) {
        throw new Error('The users repository should exist in dependencies');
    }

    const execute = (params: CreateUserParams) => {
        const { name, emailId,password, gender, } = params;
        const user = new User({ name, password, gender, emailId});

        return usersRepository.add(user);
    };

    return {
        execute
    };
};

export default createUser;
