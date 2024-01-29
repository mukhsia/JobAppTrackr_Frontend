// General Imports
import React from 'react';
import './JobAppInfo.css';

const JobAppInfo = ({ application, onApplicationUpdate }) => {
    const archived = application.archived ? 'Yes' : 'No';

    return (
        <div className="appinfo mb-5">
            <div>
                <h3 className="appinfo-header mb-1">Info</h3>
            </div>

            <div className="appinfo-details px-5 py-2">
                <p>Title: {application.title}</p>
                <p>Company: {application.company}</p>
                <p>Status: {application.status}</p>
                <p>Archived: {archived}</p>
            </div>
        </div>
    );
};

export default JobAppInfo;
