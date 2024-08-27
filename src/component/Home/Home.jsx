import React, { useEffect, useState } from 'react';
import Overview from './Overview/Overview';
import axios from 'axios';
import TopSection from './TopSection/TopSection';
import CalendarView from './Calendar/CalendarView';
import SideBar from '../shared/SideBar';
import CalendarModal from './Modal/Modal';
import AirQualityBarChart from './AirQualityBarChart/AirQualityBarChart';
import TempPieChart from './TempPieChart/TempPieChart';
import WindSpeedChart from './WindSpeedChart/WindSpeedChart';
import Note from './Note/Note';

const Home = () => {
    const [isOpenSidebar, setIsOpenIsdebar] = useState(false);
    const toggleSidebar = () => {
        setIsOpenIsdebar(!isOpenSidebar);
    }
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Dhaka');
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date
    const [queryDate, setQueryDate] = useState(new Date()); // Default to current date

    const handleChangeDate = newDate => {
        setSelectedDate(newDate)
        const date = new Date(newDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        setQueryDate(formattedDate)
    }

    useEffect(() => {
        // Define the API endpoint and your API key
        const apiKey = '0ff7721ed6344f74a37173445242508';
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${queryDate}&days=1&hour_fields=daily_chance_of_rain&aqi=yes`;

        // Fetch the data using Axios
        axios.get(apiUrl)
            .then(response => {
                setWeatherData(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [city, selectedDate, queryDate]);

    const handleSearch = (searchCity) => {
        setCity(searchCity);
    };

    return (
        <div className='h-screen overflow-hidden flex flex-col bg-primary'>
            <div className='flex flex-1 overflow-hidden'>
                <div >
                    <SideBar toggleSidebar={toggleSidebar} isOpenSidebar={isOpenSidebar} weatherData={weatherData} />
                </div>
                <div className='p-10 flex-1 overflow-y-scroll h-full' >
                    <div className=''>
                        {weatherData &&
                            <TopSection
                            toggleSidebar={toggleSidebar} isOpenSidebar={isOpenSidebar}
                                selectedDate={selectedDate}
                                weatherData={weatherData}
                                city={city}
                                onSearch={handleSearch}
                                setSelectedDate={handleChangeDate}
                            />
                        }
                        {weatherData && <Overview selectedDate={selectedDate} weatherData={weatherData} />}
                        <div className='flex flex-col lg:flex-row gap-10'>
                            <div className='my-10 flex-1'>
                                {weatherData && <AirQualityBarChart weatherData={weatherData} />}
                            </div>
                            <div className='flex-1'>
                                {weatherData && <WindSpeedChart weatherData={weatherData} />}

                            </div>
                        </div>
                        {/* <CalendarModal setSelectedDate={handleChangeDate} /> */}
                    </div>
                </div>
            </div>
            <Note/>
        </div>

    );
};

export default Home;
