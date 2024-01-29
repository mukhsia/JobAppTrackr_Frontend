import './SearchBar.css';

const SearchField = ({ searchFilter, onChange }) => {
    return (
        <div>
            <form>
                <input
                    className="searchbar"
                    value={searchFilter}
                    placeholder="Search..."
                    onChange={(e) => onChange(e.target.value)}
                />
            </form>
        </div>
    );
};

export default SearchField;
