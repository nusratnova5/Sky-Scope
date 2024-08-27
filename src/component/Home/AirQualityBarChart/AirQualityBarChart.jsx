import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Define color scheme for the bar chart
const COLORS = ['#E4C59E', '#AF8260', '#803D3B', '#322C2B', '#C7B09A']; // Updated colors

const AirQualityBarChart = ({ weatherData }) => {
    const airQualityData = weatherData?.forecast?.forecastday[0]?.day?.air_quality;

    const formattedData = airQualityData
      ? [
          { name: 'CO', value: airQualityData['co'] },
          { name: 'NO2', value: airQualityData['no2'] },
          { name: 'O3', value: airQualityData['o3'] },
          { name: 'SO2', value: airQualityData['so2'] },
          { name: 'PM2.5', value: airQualityData['pm2_5'] },
          { name: 'PM10', value: airQualityData['pm10'] },
        ]
      : [];
      
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={formattedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="value"
                        fill="#AF8260"
                        // fill={({ index }) => COLORS[index % COLORS.length]} // Apply colors based on index
                    />
                </BarChart>
            </ResponsiveContainer>
            <div className=''>
        <p className='text-center font-bold'>Air Quality Index Overview</p>
      </div>
        </div>
    );
};

export default AirQualityBarChart;
