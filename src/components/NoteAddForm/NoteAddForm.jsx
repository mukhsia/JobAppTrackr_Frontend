// General imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// react-bootstrap Imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Plus } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.css';

// Hook Imports
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth';

const NoteAddForm = ({ applicationId, onNotesUpdate }) => {
    const [user, token] = useAuth();

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    // Custom Form Related
    const defaultValues = {
        title: '',
        timestamp: new Date().toISOString(),
        text: '',
        jobid: applicationId,
    };

    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        postNewNote,
        defaultValues
    );

    async function postNewNote(applicationId) {
        try {
            let response = await axios.post(
                'https://localhost:5001/api/notes',
                formData,
                authHeader
            );
            onNotesUpdate(applicationId);
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
                <Plus />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add an Application Note/ History Log
                    </Modal.Title>
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
                            Text:
                            <input
                                id="text"
                                name="text"
                                type="text"
                                value={formData.text}
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

export default NoteAddForm;
