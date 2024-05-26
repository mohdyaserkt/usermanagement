
import { useEffect, useState } from 'react';
import BarChartComponent from '../components/chart';
import { axiosInstance } from '../config/axios';
import { createDataArray } from '../utlities/chartDataGen';

 
export const Dashboard = () => {
    const [chartData, setChartData] = useState<any>();
    const [count, setCount] = useState<any>([]);

    useEffect(() => {
        getUserData();
    }, []);

   

    const getUserData = async () => {
        try {
            const { monthlyData, totalCount } = (await axiosInstance.get('/users/count')).data.content;
            console.log(totalCount, "monthly");

            const createdChartData = await createDataArray(monthlyData);
            if (createdChartData) {
                console.log(createdChartData, "created data");

                setChartData(createdChartData);
                setCount(totalCount);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Dash board
      </h3>
      <div className='p-5 space-y-5'>
        <div className="flex flex-col md:flex-row gap-5 w-full ">
          
          <div className="w-full border border-gray-500 rounded-lg p-5">
            <p className='text-white font-bold text-xl mb-2'>Total Users</p>
            <h1 className=' text-white font-bold text-5xl'>{count[0]?.totalUserCount[0]?.count||0}</h1>
          </div>
          <div className="w-full border border-gray-500 rounded-lg p-5">
            <p className='text-white font-bold text-xl mb-2'>Todays Logins</p>
            <h1 className=' text-white font-bold text-5xl'>{count[0]?.todayLoginCount[0]?.count||0}</h1>
          </div>
          
        </div>
        {chartData?<BarChartComponent data={chartData} />:<></>}
      </div>
    </div>
  );
};
