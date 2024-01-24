// General import
import axios from 'axios';

const JobAppItem = ({ application, onApplicationUpdate }) => {
    return (
        <tr>
            <td>{application.title}</td>
            <td>{application.artist}</td>
            <td>{application.album}</td>
            <td>{application.releaseDate}</td>
            <td>{application.genre}</td>
            <td>{application.likes}</td>
            <td>
                <form onSubmit={handleDelete} className="flex-item">
                    <button type="submit" className="btn btn-danger">
                        Delete
                    </button>
                </form>
            </td>
        </tr>
    );
};

export default JobAppItem;
