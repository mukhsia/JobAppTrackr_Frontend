// General Imports
import React from 'react';

// Component Imports
import JobAppEditForm from '../JobAppEditForm/JobAppEditForm';

const JobAppInfo = ({ application, onApplicationUpdate }) => {
    const archived = application.archived ? 'Yes' : 'No';

    return (
        <div>
            <div>
                <h3>Info</h3>
            </div>

            <div>
                <p>Title: {application.title}</p>
                <p>Company: {application.company}</p>
                <p>Status: {application.status}</p>
                <p>Archived: {archived}</p>
            </div>
        </div>
    );
};

export default JobAppInfo;
