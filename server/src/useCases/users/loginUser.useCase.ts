import { User, comparePasswords } from '../../entities';

interface UserDependencies {
  usersRepository: any; // Adjust this type according to your repository interface/type
}

interface LoginUserParams {
  password: string;
  emailId: string;
}

const loginUser = (dependencies: UserDependencies) => {
  const { usersRepository } = dependencies;

  if (!usersRepository) {
    throw new Error('The users repository should exist in dependencies');
  }

  const execute = async (params: LoginUserParams) => {
    const { emailId, password } = params;
    let errorDetails = {
      status: 0,
      msg: '',
      reason: '',
    };
    const useData = await usersRepository.getByEmail(emailId);
    if (!useData) {
      errorDetails.msg = 'Login failed User does not exist please signup';
      errorDetails.reason = 'User does not exist';
      errorDetails.status = 404;
    } else {
      const pasStatus = await comparePasswords(password, useData.password);
      if (pasStatus) {
        const user = await usersRepository.countInc(useData._id);
        return { status: pasStatus, user };
      } else {
        errorDetails.msg = 'Login failed password Incorrect';
        errorDetails.reason = 'Password incorrect';
        errorDetails.status = 401;
      }
    }   

    return { status: false, errorDetails };
  };

  return {
    execute,
  };
};

export default loginUser;
