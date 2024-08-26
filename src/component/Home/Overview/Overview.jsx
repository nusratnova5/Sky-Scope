import React, { useEffect } from 'react';
import { GiWhirlwind } from 'react-icons/gi';

const Overview = ({ weatherData }) => {
    const info = [
        {
            icon: <GiWhirlwind />,
            title: "Wind Speed",
            speed: `${weatherData?.current?.wind_kph}`
        },
        {
            icon: <GiWhirlwind />,
            title: "Phone",
            speed: `${weatherData?.current?.wind_kph}`
        },
        {
            icon: <GiWhirlwind />,
            title: "Phone",
            speed: `${weatherData?.current?.wind_kph}`
        },
        {
            icon: <GiWhirlwind />,
            title: "Phone",
            speed: `${weatherData?.current?.wind_kph}`
        },
    ]
    return (
        <div className=''>
            <p>Today Overview</p>
                <div className='grid lg:grid-cols-4 gap-3'>
                {info?.map((item) => {
                    return <div className='flex items-center border'>
                        <div className=''>
                            <div className='text-[28px]'>{item.icon}</div>
                        </div>
                        <div className='flex-1'>
                            <p className=''>{item.title}</p>
                            <h3 className='text-xl'>{item.speed} Km/h</h3>
                        </div>
                    </div>
                })}
                </div>
        </div>
    );
};
export default Overview;