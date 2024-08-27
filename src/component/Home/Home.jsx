import React, { useEffect, useState } from 'react';
import Overview from './Overview/Overview';
import axios from 'axios';
import TopSection from './TopSection/TopSection';
import CalendarView from './Calendar/CalendarView';
import SideBar from '../shared/SideBar';
import CalendarModal from './Modal/Modal';

const Home = () => {
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
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&dt=${queryDate}&days=1&hour_fields=daily_chance_of_rain`;

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
        <div className='h-screen overflow-hidden flex flex-col'>
        <div className='flex flex-1 overflow-hidden'>
            <div >
                <SideBar weatherData={weatherData} />
            </div>
            <div className='p-10 flex-1 overflow-y-scroll h-full pt-20' >     
                   <div className=''>
            {weatherData && 
                <TopSection 
                    selectedDate={selectedDate} 
                    weatherData={weatherData} 
                    city={city} 
                    onSearch={handleSearch}
                    setSelectedDate={handleChangeDate} 
                />
            }
            {weatherData && <Overview selectedDate={selectedDate} weatherData={weatherData} />}
            {/* <CalendarModal setSelectedDate={handleChangeDate} /> */}
        </div>
            </div>
        </div>
    </div>

    );
};

export default Home;
