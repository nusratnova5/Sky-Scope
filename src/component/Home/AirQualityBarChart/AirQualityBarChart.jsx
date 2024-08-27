import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AirQualityBarChart = ({weatherData}) => {
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
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
};

export default AirQualityBarChart;