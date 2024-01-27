// General Imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

//Component Import
import InterviewItem from '../InterviewItem/InterviewItem';

const InterviewsList = ({ jobAppId }) => {
    const [user, token] = useAuth();
    const [interviews, setInterviews] = useState([]);

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
            console.log(interviews);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchInterviews(jobAppId);
    }, []);

    const interviewItems = interviews.map((interview) => (
        <InterviewItem
            interview={interview}
            key={interview.id}
            onInterviewUpdate={fetchInterviews}
        />
    ));

    return (
        <div>
            <h3>Interviews</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Type</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Interviewer</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>{interviewItems}</tbody>
            </table>
        </div>
    );
};

export default InterviewsList;
