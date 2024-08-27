import React, { useEffect, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

// Define color scheme for the pie chart
const COLORS = ['#FF6F61', '#FF8C00', '#FFD700', '#ADFF2F', '#00FF00'];

const TempPieChart = ({ weatherData }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (weatherData && weatherData.forecast && weatherData.forecast.forecastday[0]) {
            const hourlyData = weatherData.forecast.forecastday[0].hour;
            const currentTime = new Date(); // Get the current time

            // Filter and sort hourly data to get the latest 5 hours
            const latestHours = hourlyData
                .filter(hour => {
                    const hourTime = new Date(hour.time);
                    return hourTime <= currentTime;
                })
                .slice(-5) // Get the last 5 hours
                .map(hour => ({
                    name: new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Format time
                    value: hour.temp_c // Temperature value
                }));

            setData(latestHours);
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
                                    <div style={{ padding: '10px', backgroundColor: '#fff', border: '1px solid #ccc' }}>
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
