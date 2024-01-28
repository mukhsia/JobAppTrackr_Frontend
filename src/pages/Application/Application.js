// General Import
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
    const [interviews, setInterviews] = useState([]);
    const [notes, setNotes] = useState([]);

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

    async function fetchInterviews(jobAppId) {
        const authHeader = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        try {
            const response = await axios.get(
                `https://localhost:5001/api/interviews/${jobAppId}`,
                authHeader
            );
            setInterviews(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchNotes(jobAppId) {
        const authHeader = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        try {
            const response = await axios.get(
                `https://localhost:5001/api/notes/${jobAppId}`,
                authHeader
            );
            setNotes(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchApplicationById(jobAppId);
        fetchInterviews(jobAppId);
        fetchNotes(jobAppId);
    }, []);

    return (
        <div>
            <Link to={`/MyJobApplications`}>Back</Link>
            <JobAppInfo
                application={application}
                onApplicationUpdate={fetchApplicationById}
            />
            <InterviewsList
                interviews={interviews}
                onInterviewsUpdate={fetchInterviews}
            />
            <NotesList notes={notes} onNotesUpdate={fetchNotes} />
        </div>
    );
};

export default Application;
