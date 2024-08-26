import React, { useEffect, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/Firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Overview from '../Home/Overview/Overview';

const DashboardHeader = ({ toggleSidebar }) => {
    const [monthYear, setMonthYear] = useState('');
    const [fullDate, setFullDate] = useState('');

    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const now = new Date();

        // Format "August 2024"
        const optionsMonthYear = { month: 'long', year: 'numeric' };
        setMonthYear(now.toLocaleDateString('en-US', optionsMonthYear));

        // Format "Monday, Aug 26 2024"
        const optionsFullDate = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        setFullDate(now.toLocaleDateString('en-US', optionsFullDate));
    }, []);

    useEffect(() => {
        // Define the API endpoint and your API key
        const apiKey = '0ff7721ed6344f74a37173445242508';
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Dhaka`;

        // Fetch the data using Axios
        axios.get(apiUrl)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <div className="navbar fixed px-2 lg:px-10 z-10">
            <div className="flex-1 d-block lg:d-none">
                <a className="btn btn-ghost text-xl text-red-900">Tech Hub</a>
            </div>
            <div className="flex-none gap-2">
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label onClick={toggleSidebar} className="btn bg-transparent border-0 shadow-transparent drawer-button lg:hidden">
                        <FontAwesomeIcon icon={faBars} />
                    </label>
                </div>
                <div className="">
                    <p className='text-start'>{monthYear}</p>
                    <p>{fullDate}</p>
                </div>
                
                <div className="dropdown dropdown-end">
                   <input type="text" value={weatherData?.location?.name} className='border' />
                </div>
            </div>
            {weatherData && <Overview weatherData={weatherData} />}
        </div>
    );
};

export default DashboardHeader;
