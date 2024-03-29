// General Import
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyDashboard.css';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import MyCalendar from '../../components/MyCalendar/MyCalendar';
import TopFiveList from '../../components/TopFiveList/TopFiveList';

const MyDashboard = () => {
    const [user, token] = useAuth();
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [topFive, setTopFive] = useState([]);
    const [bottomFive, setBottomFive] = useState([]);

    const handleTopFive = (applications) => {
        const sortedApplications = [...applications].sort(
            sortApplicationByTime
        );
        setTopFive(sortedApplications.slice(0, 5));
        setBottomFive(sortedApplications.slice(-5).reverse());
    };

    function sortApplicationByTime(a, b) {
        // Newest note is the last one
        const aTime = new Date(a.notes.slice(-1)[0].timeStamp);
        const bTime = new Date(b.notes.slice(-1)[0].timeStamp);
        return bTime - aTime;
    }

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
            handleTopFive(applications);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div className="page-body">
            <div className="container">
                <MyCalendar applications={applications} />
                <div className="d-flex justify-content-around">
                    <div className="topfive-container">
                        <h5 className="mb-4">Most Recent Applications</h5>
                        <TopFiveList topFive={topFive} />
                    </div>
                    <div className="topfive-container">
                        <h5 className="mb-4">Least Recent Applications</h5>
                        <TopFiveList
                            topFive={bottomFive}
                            handleTopFive={setTopFive}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyDashboard;
