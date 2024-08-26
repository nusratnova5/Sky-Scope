import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GoSun } from 'react-icons/go';
import { PiSunHorizonFill } from 'react-icons/pi';
import { WiMoonAltWaxingCrescent2, WiMoonrise, WiMoonset } from 'react-icons/wi';
import { Link } from 'react-router-dom';

const SideBar = ({ isOpenSidebar, toggleSidebar }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [astronomyData, setAstronomyData] = useState(null);
    const [hourlyRaining, setHourlyRaining] = useState(null);
    const [error, setError] = useState(null);
    console.log(hourlyRaining)
    useEffect(() => {
        // Define the API endpoint and your API key
        const apiKey = '0ff7721ed6344f74a37173445242508';
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Dhaka`;
        const apiUrlforAstronomy = `https://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=Dhaka`;
        const apiUrlforHourlyRaining = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Dhaka&days=1&hour_fields=daily_chance_of_rain`;

        // Fetch the data using Axios
        axios.get(apiUrl)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
        axios.get(apiUrlforAstronomy)
            .then(response => {
                setAstronomyData(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
        axios.get(apiUrlforHourlyRaining)
            .then(response => {
                setHourlyRaining(response.data);
                console.log(response.data);

            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const iconUrl = `https:${weatherData?.current?.condition?.icon}`;
    return (
        <div className="drawer lg:drawer-open z-10">
            <input checked={isOpenSidebar} type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label onClick={toggleSidebar} aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-accent text-white">
                    <li>
                        <div className="flex-1 gap-5 justify-between items-center my-5">
                            <div>
                                <p className='text-2xl'>{weatherData?.location?.name}</p>
                                <p>{weatherData?.location?.country}</p>
                            </div>
                            <p className='text-2xl'>{weatherData?.location?.localtime.split(" ")[1]}</p>
                        </div>
                    </li>
                    <li>
                        <div className='flex flex-col items-start'>
                            <img
                                src={iconUrl}
                                alt={weatherData?.current?.condition?.text}
                                className="w-12 h-12"
                            />
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-4xl'>{weatherData?.current?.temp_c} °C</p>
                                <p className=''>{weatherData?.current?.condition?.text}</p>
                            </div>
                        </div>
                    </li>
                    <li className=''>
  <p className='flex flex-col'>
    {hourlyRaining?.forecast?.forecastday[0]?.hour
      ?.slice(-5)
      .map((hour, index) => (
        <span key={index}>
          {hour.time.split(" ")[1]} - {hour.chance_of_rain}%
        </span>
      ))}
  </p>
</li>

                    <li>
                        <div className='border my-3'>
                            <div className='flex flex-col items-center'>
                                <div className='flex justify-center items-center gap-2'>
                                    <GoSun />
                                    <p>Sunrise</p>
                                </div>
                                <p>{astronomyData?.astronomy?.astro?.sunrise}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='flex justify-center items-center gap-2'>
                                    <PiSunHorizonFill />
                                    <p>Sunset</p>
                                </div>
                                <p>{astronomyData?.astronomy?.astro?.sunset}</p>
                            </div>
                        </div>
                        <div className='border'>
                            <div className='flex flex-col items-center'>
                                <div className='flex justify-center items-center gap-1'>
                                    <WiMoonrise />
                                    <p>Moonrise</p>
                                </div>
                                <p>{astronomyData?.astronomy?.astro?.moonrise}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='flex justify-center items-center gap-1'>
                                    <WiMoonset />
                                    <p>Moonset</p>
                                </div>
                                <p>{astronomyData?.astronomy?.astro?.moonset}</p>
                            </div>
                            <div className='flex flex-col items-center'>
                                <div className='flex justify-center items-center gap-1'>
                                    <WiMoonAltWaxingCrescent2 />
                                    <p>Moonphase</p>
                                </div>
                                <p>{astronomyData?.astronomy?.astro?.moon_phase}</p>
                            </div>
                        </div>
                    </li>
                </ul>

            </div>
        </div>
    );
};

export default SideBar;