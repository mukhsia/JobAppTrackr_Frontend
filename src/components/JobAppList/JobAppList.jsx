// General Imports
import React from 'react';

// Hook Imports
import useAuth from '../../hooks/useAuth';

// Component Imports
import JobAppItem from '../JobAppItem/JobAppItem';
import JobAppAddForm from '../JobAppAddForm/JobAppAddForm';
import { Table } from 'react-bootstrap';

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
                application.id === parseInt(searchFilter) ||
                application.title.includes(searchFilter) ||
                application.status.includes(searchFilter) ||
                application.company.includes(searchFilter)
        );
    }
    filteredApplications = filteredApplications
        .reverse()
        .map((application) => (
            <JobAppItem
                application={application}
                key={application.id}
                onApplicationUpdate={onApplicationUpdate}
            />
        ));

    return (
        <div className="app-list">
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Company</th>
                        <th>Archived</th>
                        <th>
                            <JobAppAddForm
                                onApplicationUpdate={onApplicationUpdate}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>{filteredApplications}</tbody>
            </Table>
        </div>
    );
};

export default JobAppList;
