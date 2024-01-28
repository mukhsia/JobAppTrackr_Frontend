// General Imports
import React from 'react';
import './MyCalendar.css';

// Full Calendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const MyCalendar = (interviews) => {
    let events = [];
    return (
        <div className="myCalendar">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height={700}
            />
        </div>
    );
};

export default MyCalendar;
