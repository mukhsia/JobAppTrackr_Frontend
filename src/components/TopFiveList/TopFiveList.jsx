// General Imports
import React from 'react';
import { Link } from 'react-router-dom';

const TopFiveTable = ({ topFive, handleTopFive }) => {
    const list = topFive.map((a, index) => {
        return (
            <tr key={index}>
                <td>
                    <Link to={`/applications/${a.id}`}>{a.id}</Link>
                </td>
                <td>
                    <Link to={`/applications/${a.id}`}>{a.title}</Link>
                </td>
                <td>{a.notes[0].timeStamp.substring(0, 10)}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Last Update</th>
                    </tr>
                </thead>
                <tbody>{list}</tbody>
            </table>
        </div>
    );
};

export default TopFiveTable;
