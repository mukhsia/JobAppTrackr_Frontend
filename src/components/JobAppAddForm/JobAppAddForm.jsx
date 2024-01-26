//General imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel } from '@mui/material';

// Hook Imports
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth';

const JobAppAddForm = ({ application, onApplicationUpdate }) => {
    const [user, token] = useAuth();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const defaultValues = {
        title: 'Software Developer I',
        archived: false,
        status: 'Applied',
        company: 'The Company',
    };

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
        postNewApplication,
        defaultValues
    );

    async function postNewNote(jobId) {
        try {
            let response = await axios.post(
                'https://localhost:5001/api/notes',
                {
                    jobid: jobId,
                    title: 'Job Application Added',
                    timestamp: Date.now().toISOString(),
                    text: 'Job Application Added',
                },
                authHeader
            );
            onApplicationUpdate();
        } catch (error) {
            console.warn('Error trying to post note: ', error);
        }
    }

    async function postNewApplication() {
        try {
            let response = await axios.post(
                'https://localhost:5001/api/applications',
                formData,
                authHeader
            );
            postNewNote(response.data.id);
        } catch (error) {
            console.warn('Error trying to post review: ', error);
        }
    }

    const simpleAddForm = () => {
        return <div></div>;
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 640,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <Button onClick={handleOpen}>
                <AddIcon />
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default JobAppAddForm;
