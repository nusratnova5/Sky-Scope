import React, { useEffect, useState } from 'react';

const TopSection = ({weatherData}) => {
    
    const [monthYear, setMonthYear] = useState('');
    const [fullDate, setFullDate] = useState('');
    useEffect(() => {
        const now = new Date();

        // Format "August 2024"
        const optionsMonthYear = { month: 'long', year: 'numeric' };
        setMonthYear(now.toLocaleDateString('en-US', optionsMonthYear));

        // Format "Monday, Aug 26 2024"
        const optionsFullDate = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        setFullDate(now.toLocaleDateString('en-US', optionsFullDate));
    }, []);
    return (
        <div>
            <div className="flex gap-2">
                <div className="">
                    <p className=''>{monthYear}</p>
                    <p>{fullDate}</p>
                </div>

                <div className="dropdown dropdown-end">
                    <input type="text" value={weatherData?.location?.name} className='border' />
                </div>
            </div>
        </div>
    );
};

export default TopSection;