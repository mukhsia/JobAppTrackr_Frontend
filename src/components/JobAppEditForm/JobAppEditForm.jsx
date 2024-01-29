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

const JobAppEditForm = ({
    application,
    onApplicationUpdate,
    handleStatusChange,
}) => {
    const [user, token] = useAuth();

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    // Custom Form Related
    const defaultValuesApplication = {
        title: application.title,
        archived: application.archived,
        status: application.status,
        company: application.company,
    };

    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        PutEditApplication,
        defaultValuesApplication
    );

    async function PutEditApplication() {
        try {
            let response = await axios.put(
                `https://localhost:5001/api/applications/${application.id}`,
                formData,
                authHeader
            );
            postNewNote(response.data.id);
            onApplicationUpdate(response.data.id);
            handleStatusChange(response.data);
        } catch (error) {
            console.warn('Error trying to post review: ', error);
        }
    }

    async function postNewNote() {
        try {
            let response = await axios.post(
                'https://localhost:5001/api/notes',
                {
                    title: 'Application Edited',
                    timestamp: new Date().toISOString(),
                    text: 'Application Edited',
                    jobid: application.id,
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
                    <Modal.Title>Edit Application</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="form">
                        <label>
                            Title
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Company:
                            <input
                                id="company"
                                name="company"
                                type="text"
                                value={formData.company}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="Applied">Applied</option>
                                <option value="Application Responded">
                                    Application Responded
                                </option>
                                <option value="Phone Interview">
                                    Phone Interview
                                </option>
                                <option value="Screening Interview">
                                    Screening Interview
                                </option>
                                <option value="Technical Interview">
                                    Technical Interview
                                </option>
                                <option value="Final Interview">
                                    Final Interview
                                </option>
                                <option value="Rejected">Rejected</option>
                                <option value="Job Offer Received">
                                    Job Offer Received
                                </option>
                                <option value="Job Offer Accepted">
                                    Job Offer Accepted
                                </option>
                            </select>
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

export default JobAppEditForm;
