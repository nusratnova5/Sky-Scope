import React, { useEffect } from 'react';
import { FiWind } from 'react-icons/fi';
import { GiWhirlwind } from 'react-icons/gi';
import { HiOutlineCloud } from 'react-icons/hi';
import { LiaCloudRainSolid } from 'react-icons/lia';
import { LuSunDim } from 'react-icons/lu';
import { PiCloudSnowLight } from 'react-icons/pi';
import { TbTemperatureSun } from 'react-icons/tb';
import { WiBarometer, WiCloudyGusts, WiHumidity } from 'react-icons/wi';
import TempPieChart from '../TempPieChart/TempPieChart';
const COLORS = ['#FF6F61', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF00'];

const Overview = ({ weatherData }) => {    
    const info = [
        {
            icon: <FiWind />,
            title: "Wind Speed",
            status: `${weatherData?.current?.wind_kph}  Km/h`
        },
        {
            icon: <WiBarometer />,
            title: "Pressure",
            status: `${weatherData?.current?.pressure_mb} mb`
        },
        {
            icon: <WiHumidity />,
            title: "Humidity",
            status: `${weatherData?.current?.humidity}%`
        },
        {
            icon: <HiOutlineCloud />,
            title: "Cloud",
            status: `${weatherData?.current?.cloud}%`
        },
        {
            icon: <LiaCloudRainSolid />,
            title: "Change of Rain",
            status: `${weatherData?.forecast?.forecastday[0]?.day?.daily_chance_of_rain}%`
        },
        {
            icon: <WiCloudyGusts />,
            title: "Gust",
            status: `${weatherData?.current?.gust_kph} Km/h`
        },
        {
            icon: <TbTemperatureSun />,
            title: "Feelslike",
            status: `${weatherData?.current?.feelslike_c}°C`
        },
        {
            icon: <LuSunDim />,
            title: "UV Index",
            status: `${weatherData?.current?.uv}`
        },
    ]
    return (
        <div className='grid grid-cols-1 lg:grid-cols-6 justify-center items-start gap-10'>
            <div className='col-span-4'>
                <p className='text-xl font-bold mb-2'>Today Overview</p>
                <div className='lg:grid lg:grid-cols-4 gap-3 block'>
                    {info?.map((item) => {
                        return <div className='flex items-center gap-3 bg-gray p-2 mb-3 lg:mb-0'>
                            <div className=''>
                                <div className='text-[28px]'>{item.icon}</div>
                            </div>
                            <div className='flex-1'>
                                <p className=''>{item.title}</p>
                                <h3 className='text-xl'>{item.status}</h3>
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className='col-span-4 lg:col-span-2'>
                <p className='text-xl font-bold lg:mb-2 mt-10 lg:mt-0'>Latest 5 Hours Tempareture</p>
                {weatherData && <TempPieChart weatherData={weatherData} />}

            </div>
        </div>
    );
};
export default Overview;