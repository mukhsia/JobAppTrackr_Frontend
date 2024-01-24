// General Imports
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import JobAppItem from '../JobAppItem/JobAppItem';

const JobAppList = ({
    applications,
    onApplicationUpdate,
    searchFilter = '',
}) => {
    const [user, token] = useAuth();

    let filteredApplications = applications;

    if (searchFilter) {
        filteredApplications = filteredApplications.filter(
            (application) =>
                application.title.includes(searchFilter) ||
                application.status.includes(searchFilter) ||
                application.company.includes(searchFilter)
        );
    }
    filteredApplications = filteredApplications.map((application) => (
        <JobAppItem
            application={application}
            key={application.id}
            onApplicationUpdate={onApplicationUpdate}
        />
    ));

    // TODO: Add / Axios Post

    return (
        <div>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Company</th>
                        <th>Last Updated</th>
                        {/* TODO: Add button */}
                        <th></th>
                    </tr>
                </thead>
                <tbody>{filteredApplications}</tbody>
            </table>
        </div>
    );
};

export default JobAppList;
