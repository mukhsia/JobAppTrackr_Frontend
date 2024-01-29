// General Imports
import React from 'react';
import { Link } from 'react-router-dom';

// React-bootstrap imports
import Table from 'react-bootstrap/Table';

const TopFiveTable = ({ topFive }) => {
    const list = topFive.map((a, index) => {
        return (
            <tr key={index}>
                <td>
                    <Link to={`/applications/${a.id}`}>{a.id}</Link>
                </td>
                <td>
                    <Link to={`/applications/${a.id}`}>{a.title}</Link>
                </td>
                <td>{a.notes.slice(-1)[0].timeStamp.substring(0, 10)}</td>
            </tr>
        );
    });

    return (
        <div>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>{list}</tbody>
            </Table>
        </div>
    );
};

export default TopFiveTable;
