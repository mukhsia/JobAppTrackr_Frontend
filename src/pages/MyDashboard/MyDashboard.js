// General Import
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import MyCalendar from '../../components/MyCalendar/MyCalendar';
import TopFiveTable from '../../components/TopFiveTable/TopFiveTable';

const MyDashboard = ({ fetchApplications }) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    let topFiveId = [];
    let bottomFiveId = [];

    async function fetchApplications() {
        try {
            const response = await axios.get(
                `https://localhost:5001/api/applications`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
            let applications = response.data.filter(
                (application) => application.archived === false
            );
            setApplications(applications);

            // Sort notes of each application, get the most recents, flatten, get the top 5 and bottom 5 application ids
            // let notes = applications.map((a) => a.notes).flat();
            // console.log(notes);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div>
            <MyCalendar applications={applications} />
            <div>
                <TopFiveTable applications={applications} />
                <TopFiveTable applications={applications} />
            </div>
        </div>
    );
};

export default MyDashboard;
