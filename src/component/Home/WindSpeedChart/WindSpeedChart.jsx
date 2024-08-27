import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';

const WindSpeedChart = ({ weatherData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (weatherData && weatherData.forecast && weatherData.forecast.forecastday[0]) {
      const hourlyData = weatherData.forecast.forecastday[0].hour;

      // Map the data to extract wind speed and the corresponding hour
      const chartData = hourlyData.map(hour => ({
        name: hour.time.split(' ')[1], // Extracts only the hour part from the time
        windSpeed: hour.wind_kph // Wind speed in km/h
      }));

      setData(chartData);
    }
  }, [weatherData]);

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: "Wind Speed (km/h)", angle: -90, position: 'Left' }} />
          <Tooltip />
          <Area type="monotone" dataKey="windSpeed" stroke="#C7B09A" fill="#C7B09A" />
        </AreaChart>
      </ResponsiveContainer>
      <div className='py-8'>
        <p className='text-center font-bold'>Wind Speed Overview</p>
      </div>
    </div>
  );
};

export default WindSpeedChart;
