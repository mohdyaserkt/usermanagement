interface Dependencies {
    usersRepository: any; // Adjust this type according to your repository interface/type
}

interface ExecuteParams {
    id: string;
}

const getUserById = (dependencies: Dependencies) => {
    const { usersRepository } = dependencies;

    if (!usersRepository) {
        return new Error('The users repository should exist in dependencies');
    }

    const execute = ({ id }: ExecuteParams) => {
        return usersRepository.getById(id);
    };

    return {
        execute
    };
};

export default getUserById;
