// General imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// react-bootstrap Imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PencilSquare } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.css';

// Hook Imports
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth';

const InterviewEditForm = ({ interview, onInterviewsUpdate }) => {
    const [user, token] = useAuth();

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    // Custom Form Related
    const defaultValues = {
        type: interview.type,
        interviewer: interview.interviewer,
        startdate: interview.startDate.substring(0, 10),
        enddate: interview.endDate.substring(0, 10),
        details: interview.details,
        jobid: interview.jobId,
    };

    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        PutEditInterview,
        defaultValues
    );

    async function PutEditInterview() {
        try {
            let response = await axios.put(
                `https://localhost:5001/api/interviews/${interview.id}`,
                formData,
                authHeader
            );
            postNewNote(response.data.jobId);
            onInterviewsUpdate(response.data.jobId);
        } catch (error) {
            console.warn('Error trying to post review: ', error);
        }
    }

    async function postNewNote(applicationId) {
        try {
            let response = await axios.post(
                'https://localhost:5001/api/notes',
                {
                    title: 'Interview Edited',
                    timestamp: new Date().toISOString(),
                    text: 'Interview Edited',
                    jobid: applicationId,
                },
                authHeader
            );
        } catch (error) {
            console.warn('Error trying to post review: ', error);
        }
    }

    // Modal Related
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleSubmitAndClose = (e) => {
        handleSubmit(e);
        setShow(false);
    };

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                <PencilSquare />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Interview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <label>
                            Type
                            <input
                                id="type"
                                name="type"
                                type="text"
                                value={formData.type}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Interviewer:
                            <input
                                id="interviewer"
                                name="interviewer"
                                type="text"
                                value={formData.interviewer}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Start Date:
                            <input
                                id="startdate"
                                name="startdate"
                                type="date"
                                value={formData.startdate}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            End Date:
                            <input
                                id="enddate"
                                name="enddate"
                                type="date"
                                value={formData.enddate}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Details:
                            <input
                                id="details"
                                name="details"
                                type="text"
                                value={formData.details}
                                onChange={handleInputChange}
                            />
                        </label>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) => handleSubmitAndClose(e)}
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InterviewEditForm;
