

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ setSelectedDate }) => {
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    return (
        <div>
            <Calendar onChange={handleDateChange} />
        </div>
    );
};
export default CalendarView;
