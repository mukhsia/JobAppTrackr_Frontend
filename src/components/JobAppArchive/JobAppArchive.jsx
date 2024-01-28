// General imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// react-bootstrap Imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ArchiveFill } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.css';

// Hook Imports
import useCustomForm from '../../hooks/useCustomForm';
import useAuth from '../../hooks/useAuth';

const JobAppEditForm = ({ application, onApplicationUpdate }) => {
    const [user, token] = useAuth();

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    async function changeArchiveState() {
        try {
            let response = await axios.patch(
                `https://localhost:5001/api/applications/archive/${application.id}`,
                {
                    archived: !application.archived,
                },
                authHeader
            );
            onApplicationUpdate();
        } catch (error) {
            console.warn('Error trying to patch Archived State', error);
        }
    }

    return (
        <div>
            <Button variant="secondary" onClick={changeArchiveState}>
                <ArchiveFill />
            </Button>
        </div>
    );
};

export default JobAppEditForm;
