import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoSun } from 'react-icons/go';
import { PiSunHorizonFill } from 'react-icons/pi';
import { WiMoonAltWaxingCrescent2, WiMoonrise, WiMoonset } from 'react-icons/wi';
import { Link } from 'react-router-dom';

const SideBar = ({ isOpenSidebar, toggleSidebar, city, onSearch, weatherData }) => {
    console.log(weatherData);

    const iconUrl = `https:${weatherData?.current?.condition?.icon}`;
    return (
        <div className="drawer lg:drawer-open z-10">
            <input checked={isOpenSidebar} type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label onClick={toggleSidebar} aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-accent text-white">
                    <div className='w-full'>
                        <h1 className='text-center text-secondary font-bold text-4xl mb-10'>SkyScope</h1>
                    </div>
                    <li className='w-full'>
                        <div className="flex-1 gap-5 justify-between items-center">
                            <div>
                                <p className='text-2xl'>{weatherData?.location?.name}</p>
                                <p>{weatherData?.location?.country}</p>
                                <p>{city}</p>
                            </div>
                            <p className='text-2xl'>{weatherData?.location?.localtime.split(" ")[1]}</p>
                        </div>
                    </li>
                    <li className='w-full'>
                        <div className='flex flex-col items-start'>
                            <img
                                src={iconUrl}
                                alt={weatherData?.current?.condition?.text}
                                className="w-12 h-12"
                            />
                            <div className='flex gap-16 justify-between items-center'>
                                <p className='text-3xl flex-none'>{weatherData?.current?.temp_c} °C</p>
                                <p className='text-center'>{weatherData?.current?.condition?.text}</p>
                            </div>
                        </div>
                    </li>
                    <div className='w-full'>
                        <hr className='w-[90%] mx-auto p-0' />
                    </div>
                    <li className='flex flex-col w-full'>
                        <p>Chance of Rain</p>
                        {weatherData?.forecast?.forecastday[0]?.hour
                            ?.slice(-5)
                            .map((hour, index) => (
                                <div key={index} className='flex items-center space-x-2 w-full'>
                                    <span>{hour.time.split(" ")[1]}</span>
                                    <progress
                                        className="progress progress-success w-56"
                                        value={hour.chance_of_rain}
                                        max="100"
                                    ></progress>
                                    <span>{hour.chance_of_rain}%</span>
                                </div>
                            ))}
                    </li>

                    <li className='w-full'>
                        <div className='border my-3 w-full flex justify-between'>
                            <div className='flex flex-col items-start'>
                                <div className='flex items-center gap-2'>
                                    <GoSun />
                                    <p>Sunrise</p>
                                </div>
                                <p>{weatherData?.forecast?.forecastday[0]?.astro?.sunrise}</p>
                            </div>
                            <div className='flex flex-col items-start'>
                                <div className='flex justify-center items-center gap-2'>
                                    <PiSunHorizonFill />
                                    <p>Sunset</p>
                                </div>
                                <p>{weatherData?.forecast?.forecastday[0]?.astro?.sunset}</p>
                            </div>
                        </div>
                        <div className='flex flex-col border w-full items-start'>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex items-center '>
                                    <WiMoonrise className='text-4xl' />
                                    <p>Moonrise</p>
                                </div>
                                <p>{weatherData?.forecast?.forecastday[0]?.astro?.moonrise}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex items-center'>
                                    <WiMoonset className='text-4xl' />
                                    <p>Moonset</p>
                                </div>
                                <p>{weatherData?.forecast?.forecastday[0]?.astro?.moonset}</p>
                            </div>
                            <div className='flex justify-between items-center w-full'>
                                <div className='flex items-center'>
                                    <WiMoonAltWaxingCrescent2 className='text-2xl' />
                                    <p>Moonphase</p>
                                </div>
                                <p className=''>{weatherData?.forecast?.forecastday[0]?.astro?.moon_phase}</p>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default SideBar;