// General imports
import { useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

const NoteItem = ({ note, onNotesUpdate }) => {
    const [user, token] = useAuth();

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    return (
        <tr>
            <td>{note.title}</td>
            <td>{note.timeStamp.substring(0, 10)}</td>
            <td>{note.text}</td>
        </tr>
    );
};

export default NoteItem;
