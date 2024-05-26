import { useNavigate } from "react-router-dom";

export const UserHome: React.FC = () => {
    const navigate = useNavigate();
    // Dummy user data
    const user = {
      name: "John Doe",
      email: "johndoe@example.com",
      gender: "Male",
    };
    const logOut=()=>{
        localStorage.clear()
        navigate(`/signin`, { replace: true });
    }
  
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="w-full flex justify-end">

        <button onClick={logOut} type="button" className="text-red-700 m-3 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Logout</button>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
               User Details
              </h1>
              <div>
                <p className="text-xl text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
                <p className="text-xl text-gray-800 dark:text-gray-200">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
                <p className=" text-xl text-gray-800 dark:text-gray-200">
                  <span className="  font-semibold">Gender:</span> {user.gender}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  