// General Import
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import JobAppInfo from '../../components/JobAppInfo/JobAppInfo';
import InterviewsList from '../../components/InterviewsList/InterviewsList';
import NotesList from '../../components/NotesList/NotesList';

const Application = () => {
    const [user, token] = useAuth();
    const navigate = useNavigate();
    const [application, setApplication] = useState({});
    const { jobAppId } = useParams();

    async function fetchApplicationById(jobAppId) {
        try {
            const response = await axios.get(
                `https://localhost:5001/api/applications/${jobAppId}`,
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            );
            setApplication(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApplicationById(jobAppId);
    }, []);

    return (
        <div>
            <JobAppInfo
                application={application}
                onApplicationUpdate={fetchApplicationById}
            />
            <InterviewsList jobAppId={jobAppId} />
            <NotesList jobAppId={jobAppId} />
        </div>
    );
};

export default Application;
