import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import CalendarView from '../Calendar/CalendarView';
import { RiCalendar2Fill } from 'react-icons/ri';
import { TbLayoutSidebarFilled } from 'react-icons/tb';

const TopSection = ({ weatherData, selectedDate, city, onSearch, setSelectedDate, toggleSidebar }) => {
    const [monthYear, setMonthYear] = useState('');
    const [fullDate, setFullDate] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        if (selectedDate) {
            const date = selectedDate;

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            const dayName = dayNames[date.getDay()];
            const month = date.getMonth();
            const day = date.getDate();
            const year = date.getFullYear();

            setMonthYear(`${monthNames[month]} ${year}`);
            setFullDate(`${dayName}, ${shortMonthNames[month]} ${day} ${year}`);
        }
    }, [selectedDate]);

    const handleSearch = () => {
        onSearch(searchCity); // Trigger search in Home component
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between mb-8">
                <div>
                    <div className='flex items-center justify-between'>
                        <p className='text-3xl font-bold text-dark'>{monthYear}</p>

                        <label onClick={toggleSidebar} className="btn text-4xl bg-transparent border-0 shadow-transparent drawer-button lg:hidden">
                            <TbLayoutSidebarFilled />
                        </label>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>{fullDate}</p>
                        <button className="btn bg-transparent border-none shadow-none hover:bg-transparent tooltip tooltip-right" data-tip="select a date" onClick={openModal}><RiCalendar2Fill /></button>
                        {isModalOpen && (
                            <dialog className="modal" open>
                                <div className="modal-box">
                                    <CalendarView setSelectedDate={setSelectedDate} />
                                </div>
                                <form method="dialog" className="modal-backdrop" onClick={closeModal}>
                                    <button>close</button>
                                </form>
                            </dialog>
                        )}
                    </div>
                </div>

                <div className="dropdown dropdown-end">
                    {/* <input 
                        type="text" 
                        value={weatherData?.location?.name || city} 
                        className='border' 
                        readOnly 
                    /> */}
                    <div className="join">
                        <div>
                            <div>
                                <input
                                    className="input input-bordered join-item"
                                    placeholder="Enter a country"
                                    value={searchCity}
                                    onChange={(e) => setSearchCity(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="indicator">
                            <button className="btn join-item text-white bg-secondary" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopSection;
