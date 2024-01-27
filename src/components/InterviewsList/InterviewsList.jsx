// General Imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

//Component Import
import InterviewItem from '../InterviewItem/InterviewItem';

const InterviewsList = ({ interviews, onInterviewsUpdate }) => {
    const [user, token] = useAuth();

    const interviewItems = interviews.map((interview) => (
        <InterviewItem
            interview={interview}
            key={interview.id}
            onInterviewsUpdate={onInterviewsUpdate}
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
