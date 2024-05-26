interface Dependencies {
    usersRepository: any; // Adjust this type according to your repository interface/type
}

interface ExecuteParams {
    id: string;
}

const getUsers = (dependencies: Dependencies) => {
    const { usersRepository } = dependencies;

    if (!usersRepository) {
        return new Error('The users repository should exist in dependencies');
    }

    const execute = () => {
        return usersRepository.getUsers();
    };

    return {
        execute
    };
};

export default getUsers;
