interface Dependencies {
    usersRepository: any; // Adjust this type according to your repository interface/type
}

interface ExecuteParams {
    user?: any; // Adjust this type according to your user model
}

const deleteUser = (dependencies: Dependencies) => {
    const { usersRepository } = dependencies;

    if (!usersRepository) {
        throw new Error('The users repository should exist in dependencies');
    }

    const execute = ({ user = {} }: ExecuteParams) => {
        return usersRepository.delete(user);
    };

    return {
        execute
    };
};

export default deleteUser;
