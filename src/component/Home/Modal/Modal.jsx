import React, { useState } from 'react';
import CalendarView from '../Calendar/CalendarView';

const CalendarModal = ({setSelectedDate}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="p-5">
            <button className="btn" onClick={openModal}>Open Modal</button>
            {isModalOpen && (
                <dialog className="modal" open>
                    <div className="modal-box">
                        <CalendarView setSelectedDate={setSelectedDate}/>
                    </div>
                    <form method="dialog" className="modal-backdrop" onClick={closeModal}>
                        <button>close</button>
                    </form>
                </dialog>
            )}
        </div>
    );
};

export default CalendarModal;
