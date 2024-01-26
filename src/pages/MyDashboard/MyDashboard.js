// General Import
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import JobAppList from '../../components/JobAppList/JobAppList';
import SearchBar from '../../components/SearchBar/SearchBar';

const MyDashboard = ({ fetchApplications }) => {
    const [user, token] = useAuth();
    const navigate = useNavigate();

    const [searchFilter, setSearchFilter] = useState('');
    const [applications, setApplications] = useState([]);

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
            setApplications(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApplications();
    }, []);

    return <div></div>;
};

export default MyDashboard;
