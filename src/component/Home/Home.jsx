import React, { useEffect, useState } from 'react';
import Overview from './Overview/Overview';
import axios from 'axios';
import TopSection from './TopSection/TopSection';
const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState('Dhaka');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Define the API endpoint and your API key
        const apiKey = '0ff7721ed6344f74a37173445242508';
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

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
        <div className=''>
            {weatherData && <TopSection weatherData={weatherData} />}
            {weatherData && <Overview weatherData={weatherData} />}
        </div>
    );
};

export default Home;