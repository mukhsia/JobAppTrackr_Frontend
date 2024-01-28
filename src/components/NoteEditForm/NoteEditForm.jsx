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

const NoteEditForm = ({ note, onNotesUpdate }) => {
    const [user, token] = useAuth();

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    // Custom Form Related
    const defaultValues = {
        title: note.title,
        timestamp: note.timestamp,
        text: note.text,
        jobid: note.jobId,
    };

    const [formData, handleInputChange, handleSubmit] = useCustomForm(
        putEditNote,
        defaultValues
    );

    async function putEditNote() {
        try {
            let response = await axios.put(
                `https://localhost:5001/api/notes/${note.id}`,
                formData,
                authHeader
            );
            onNotesUpdate(response.data.jobId);
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
                    <Modal.Title>Edit Note/ History Log</Modal.Title>
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

export default NoteEditForm;
