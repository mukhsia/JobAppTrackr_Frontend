// General Imports

// Component Imports
import InterviewsList from '../InterviewsList/InterviewsList';
import NotesList from '../NotesList/NotesList';

const JobAppInfo = ({ application, onApplicationUpdate }) => {
    const archived = application.archived ? 'Yes' : 'No';

    return (
        <div>
            <h3>Info</h3>
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
