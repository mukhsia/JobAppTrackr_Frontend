// General import
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './JobAppItem.css';

// Hook Imports
import useAuth from '../../hooks/useAuth';

//Component Imports
import JobAppEditForm from '../JobAppEditForm/JobAppEditForm';
import JobAppArchive from '../JobAppArchive/JobAppArchive';

const JobAppItem = ({ application, onApplicationUpdate }) => {
    const [status, setStatus] = useState(application.status);
    const [statusClass, setStatusClass] = useState('applied');
    const [user, token] = useAuth();
    const archived = application.archived ? (
        <td>
            <b>Yes</b>
        </td>
    ) : (
        <td>No</td>
    );

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
            handleStatusChange(response.data);
        } catch (error) {
            console.warn('Error trying to post review: ', error);
        }
    }

    useEffect(() => {
        handleStatusClass(application);
    }, []);

    useEffect(() => {
        handleStatusClass(application);
    }, [archived]);

    const handleStatusClass = (respApplication) => {
        if (respApplication.archived === true) {
            setStatusClass('archived');
        } else {
            switch (respApplication.status) {
                case 'Applied':
                    setStatusClass('applied');
                    break;
                case 'Application Responded':
                    setStatusClass('responded');
                    break;
                case 'Phone Interview':
                    setStatusClass('interview');
                    break;
                case 'Screening Interview':
                    setStatusClass('interview');
                    break;
                case 'Technical Interview':
                    setStatusClass('technical');
                    break;
                case 'Final Interview':
                    setStatusClass('final');
                    break;
                case 'Rejected':
                    setStatusClass('rejected');
                    break;
                case 'Job Offer Received':
                    setStatusClass('offer-received');
                    break;
                case 'Job Offer Accepted':
                    setStatusClass('offer-accepted');
                    break;
                default:
                    setStatusClass('applied');
                    break;
            }
        }
    };

    function handleStatusChange(response) {
        setStatus(response.status);
        handleStatusClass(response);
    }

    return (
        <tr className={statusClass}>
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
                    <option value="Job Offer Received">
                        Job Offer Received
                    </option>
                    <option value="Job Offer Accepted">
                        Job Offer Accepted
                    </option>
                </select>
            </td>
            <td>{application.company}</td>
            {archived}
            <td>
                <div className="app-btn">
                    <JobAppEditForm
                        application={application}
                        onApplicationUpdate={onApplicationUpdate}
                        handleStatusChange={handleStatusChange}
                    />
                </div>
                <div className="app-btn">
                    <JobAppArchive
                        application={application}
                        onApplicationUpdate={onApplicationUpdate}
                    />
                </div>
            </td>
        </tr>
    );
};

export default JobAppItem;
