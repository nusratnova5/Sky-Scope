import React, { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

// Define color scheme for the pie chart
const COLORS = ['#E4C59E', '#AF8260', '#803D3B', '#322C2B', '#C7B09A'];

const TempPieChart = ({ weatherData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (weatherData && weatherData.forecast && weatherData.forecast.forecastday[0]) {
            const hourlyData = weatherData.forecast.forecastday[0].hour;
            const currentTime = new Date();
            
            // Helper function to check if the date is today
            const isToday = (date) => {
                const today = new Date();
                return date.getFullYear() === today.getFullYear() &&
                       date.getMonth() === today.getMonth() &&
                       date.getDate() === today.getDate();
            };

            // Function to filter latest 5 hours from now
            const filterForToday = () => {
                return hourlyData
                    .filter(hour => {
                        const hourTime = new Date(hour.time);
                        return hourTime <= currentTime;
                    })
                    .filter(hour => new Date(hour.time).getTime() >= currentTime.getTime() - 5 * 60 * 60 * 1000) // Last 5 hours from now
                    .slice(-5)
                    .map(hour => ({
                        name: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time
                        value: hour.temp_c
                    }));
            };

            // Function to filter latest 5 hours regardless of date
            const filterForPastDays = () => {
                return hourlyData
                    .slice(-5)
                    .map(hour => ({
                        name: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time
                        value: hour.temp_c
                    }));
            };

            // Determine if the data is for today
            const isDataForToday = isToday(new Date(hourlyData[0].time));

            // Get the latest 5 hours based on the condition
            const latestHours = isDataForToday ? filterForToday() : filterForPastDays();

            setData(latestHours);
        } else {
            // Handle empty or incorrect data
            setData([]);
        }
    }, [weatherData]);

    return (
        <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        content={({ payload }) => {
                            if (payload && payload.length) {
                                const { name, value } = payload[0].payload;
                                return (
                                    <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
                                        <strong>{name}</strong><br />
                                        Temperature: {value}°C
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TempPieChart;
