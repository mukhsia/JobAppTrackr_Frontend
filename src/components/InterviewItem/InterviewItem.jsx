// General imports
import { useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';
import InterviewEditForm from '../InterviewEditForm/InterviewEditForm';

const InterviewItem = ({ interview, onInterviewsUpdate }) => {
    const [user, token] = useAuth();

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return (
        <tr>
            <td>{interview.type}</td>
            <td>{interview.startDate.substring(0, 10)}</td>
            <td>{interview.endDate.substring(0, 10)}</td>
            <td>{interview.interviewer}</td>
            <td>{interview.details}</td>
            <td>
                <InterviewEditForm
                    interview={interview}
                    onInterviewsUpdate={onInterviewsUpdate}
                />
            </td>
        </tr>
    );
};

export default InterviewItem;
