// General Imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import NoteItem from '../NoteItem/NoteItem';
import NoteAddForm from '../NoteAddForm/NoteAddForm';

const NotesList = ({ jobAppId }) => {
    const [user, token] = useAuth();
    const [notes, setNotes] = useState([]);

    async function fetchNotes() {
        const authHeader = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        try {
            const response = await axios.get(
                `https://localhost:5001/api/notes/${jobAppId}`,
                authHeader
            );
            setNotes(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return <div></div>;
};

export default NotesList;
