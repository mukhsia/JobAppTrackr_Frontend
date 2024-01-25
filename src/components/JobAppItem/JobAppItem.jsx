// General import
import axios from 'axios';

const JobAppItem = ({ application, onApplicationUpdate }) => {
    // TODO: PUT axios request to edit application

    return (
        <tr>
            <td>{application.title}</td>
            <td>{application.status}</td>
            <td>{application.company}</td>
            <td>{application.releaseDate}</td>
        </tr>
    );
};

export default JobAppItem;
