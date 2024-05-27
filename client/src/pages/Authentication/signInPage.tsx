import React, { useState } from 'react';
import { axiosInstance } from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
  });

  const navigate = useNavigate();

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    let valid = true;
    let errors = { name: '', email: '', password: '', gender: '' };

    if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format';
      valid = false;
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        'Password must be at least 8 characters long and contain both letters and numbers';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const userData = {
      emailId: email,
      password,
    };

    try {
      const response = await axiosInstance.post('users/login', userData);
      const token = response?.data?.content?.token; // Extract token from response data
      console.log(token, 'my toke');

      localStorage.setItem('accessToken', token);
      const decodedToken: any = token ? jwtDecode(token) : null; // Store token in local storage
      console.log('Signup response:', response.data);
      console.log(decodedToken, 'this is decoded tokeeen');

      navigate(`/${decodedToken?.role}`, { replace: true });
      // Navigate to the home page
      // Assuming you're using React Router for navigation
    } catch (error:any) {
      alert(error.response.data.msg);

      console.error('Error signing up:', error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login your account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                dont have an account?{' '}
      
                <a onClick={()=>navigate(`/signup`, { replace: true })}
                href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  signup here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
