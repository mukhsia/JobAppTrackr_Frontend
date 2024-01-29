// General Imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

//Component Import
import InterviewItem from '../InterviewItem/InterviewItem';
import InterviewAddForm from '../InterviewAddForm/InterviewAddForm';
import { Table } from 'react-bootstrap';

const InterviewsList = ({ interviews, applicationId, onInterviewsUpdate }) => {
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
            <h3 className="textalign-left">Interviews</h3>
            <div className="app-list">
                <Table bordered hover>
                    <thead className="thead-light">
                        <tr>
                            <th>Type</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Interviewer</th>
                            <th>Details</th>
                            <th>
                                <InterviewAddForm
                                    applicationId={applicationId}
                                    onInterviewsUpdate={onInterviewsUpdate}
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>{interviewItems}</tbody>
                </Table>
            </div>
        </div>
    );
};

export default InterviewsList;
