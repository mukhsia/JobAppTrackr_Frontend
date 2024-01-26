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

const MyJobApplications = () => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');

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

    // TODO: async axios get notes

    useEffect(() => {
        fetchApplications();
    }, []);

    return (
        <div>
            <SearchBar searchFilter={searchFilter} onChange={setSearchFilter} />
            <JobAppList
                applications={applications}
                onApplicationUpdate={fetchApplications}
                searchFilter={searchFilter}
            />
        </div>
    );
};

export default MyJobApplications;