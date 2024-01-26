const SearchField = ({ searchFilter, onChange }) => {
    return (
        <form>
            <div>
                <input
                    value={searchFilter}
                    placeholder="Search..."
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
        </form>
    );
};

export default SearchField;
