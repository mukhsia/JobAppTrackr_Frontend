// General Imports
import React, { useEffect } from 'react';
import { useState } from 'react';
import './MyCalendar.css';

// Full Calendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const MyCalendar = ({ applications }) => {
    const [events, setEvents] = useState([]);

    function handleEventsChange(applications) {
        const events = applications.map(
            (a) =>
                a.interviews &&
                a.interviews.map((i) => {
                    const event = {
                        title: a.title,
                        start: i.startDate,
                        end: i.endDate,
                    };
                    return event;
                })
        );
        setEvents(events.flat());
    }

    useEffect(() => {
        handleEventsChange(applications);
    }, [applications]);

    return (
        <div className="myCalendar">
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height={700}
                events={events}
            />
        </div>
    );
};

export default MyCalendar;
