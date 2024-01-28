// General import
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

//Component Imports
import JobAppEditForm from '../JobAppEditForm/JobAppEditForm';
import JobAppArchive from '../JobAppArchive/JobAppArchive';

const JobAppItem = ({ application, onApplicationUpdate }) => {
    const [status, setStatus] = useState(application.status);
    const [user, token] = useAuth();
    const archived = application.archived ? 'Yes' : 'No';

    const authHeader = {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    };

    async function patchApplicationStatus(jobId, status) {
        try {
            let response = await axios.patch(
                `https://localhost:5001/api/applications/status/${jobId}`,
                {
                    Status: status,
                },
                authHeader
            );
            setStatus(status);
        } catch (error) {
            console.warn('Error trying to post review: ', error);
        }
    }

    return (
        <tr>
            <td>
                <Link to={`/applications/${application.id}`}>
                    {application.id}
                </Link>
            </td>
            <td>
                <Link to={`/applications/${application.id}`}>
                    {application.title}
                </Link>
            </td>
            <td>
                <select
                    value={status}
                    onChange={(e) =>
                        patchApplicationStatus(application.id, e.target.value)
                    }
                >
                    <option value="Applied">Applied</option>
                    <option value="Application Responded">
                        Application Responded
                    </option>
                    <option value="Phone Interview">Phone Interview</option>
                    <option value="Screening Interview">
                        Screening Interview
                    </option>
                    <option value="Technical Interview">
                        Technical Interview
                    </option>
                    <option value="Final Interview">Final Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Job Offer Received">Offer Received</option>
                    <option value="Job Offer Accepted">
                        Job Offer Accepted
                    </option>
                </select>
            </td>
            <td>{application.company}</td>
            <td>{archived}</td>
            <td>
                <JobAppEditForm
                    application={application}
                    onApplicationUpdate={onApplicationUpdate}
                />
                <JobAppArchive
                    application={application}
                    onApplicationUpdate={onApplicationUpdate}
                />
            </td>
        </tr>
    );
};

export default JobAppItem;
