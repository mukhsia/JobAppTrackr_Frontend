// General Imports
import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import NoteItem from '../NoteItem/NoteItem';
import NoteAddForm from '../NoteAddForm/NoteAddForm';
import { Table } from 'react-bootstrap';

const NotesList = ({ notes, applicationId, onNotesUpdate }) => {
    const [user, token] = useAuth();

    const noteItems = notes.map((note) => (
        <NoteItem note={note} key={note.id} onNotesUpdate={onNotesUpdate} />
    ));

    return (
        <div className="app-list mt-5">
            <h3>Notes</h3>
            <Table bordered hover>
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Timestamp</th>
                        <th>Details</th>
                        <th>
                            <NoteAddForm
                                applicationId={applicationId}
                                onNotesUpdate={onNotesUpdate}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>{noteItems}</tbody>
            </Table>
        </div>
    );
};

export default NotesList;
