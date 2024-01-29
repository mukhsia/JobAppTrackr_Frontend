// General Imports
import React, { useEffect } from 'react';
import { useState } from 'react';
import './MyCalendar.css';

// Full Calendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';

const MyCalendar = ({ applications }) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    function handleEventsChange(applications) {
        const events = applications.map(
            (a) =>
                a.interviews &&
                a.interviews.map((i) => {
                    const title = i.type + ' - ' + a.title;
                    const event = {
                        title: title,
                        start: i.startDate,
                        end: i.endDate,
                        url: `../applications/${a.id}`,
                    };
                    return event;
                })
        );
        setEvents(events.flat());
    }

    function handleEventClick(info) {
        info.jsEvent.preventDefault();

        navigate(info.event.url);
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
                eventClick={handleEventClick}
            />
        </div>
    );
};

export default MyCalendar;
