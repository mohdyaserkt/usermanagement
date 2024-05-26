import { User, comparePasswords } from '../../entities';

interface UserDependencies {
  usersRepository: any; // Adjust this type according to your repository interface/type
}

interface LoginUserParams {
  password: string;
  emailId: string;
}

const loginAdmin = (dependencies: UserDependencies) => {
  const { usersRepository } = dependencies;

  if (!usersRepository) {
    throw new Error('The users repository should exist in dependencies');
  }

  const execute = async (params: LoginUserParams) => {
    const { emailId, password } = params;
   
    return emailId==process.env.ADMIN_EMAIL&&password==process.env.ADMIN_PASSWORD
    
  };

  return {
    execute,
  };
};

export default loginAdmin;
