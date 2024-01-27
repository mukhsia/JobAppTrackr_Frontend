// General Imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import NoteItem from '../NoteItem/NoteItem';
import NoteAddForm from '../NoteAddForm/NoteAddForm';

const NotesList = ({ notes, onNotesUpdate }) => {
    const [user, token] = useAuth();

    const noteItems = notes.map((note) => (
        <NoteItem note={note} key={note.id} onNotesUpdate={onNotesUpdate} />
    ));

    return (
        <div>
            <h3>Notes</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Timestamp</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>{noteItems}</tbody>
            </table>
        </div>
    );
};

export default NotesList;
