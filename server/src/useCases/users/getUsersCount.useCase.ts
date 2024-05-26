interface Dependencies {
    usersRepository: any; // Adjust this type according to your repository interface/type
}

interface ExecuteParams {
    id: string;
}

const getUsersCount = (dependencies: Dependencies) => {
    const { usersRepository } = dependencies;

    if (!usersRepository) {
        return new Error('The users repository should exist in dependencies');
    }

    const execute = async() => {
        
        let monthlyData=await usersRepository.getUsersCount()
        let totalCount = await usersRepository.getTotalUsersCount()
        return {monthlyData,totalCount}
    };

    return {
        execute
    };
};

export default getUsersCount;
