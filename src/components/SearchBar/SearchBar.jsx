const SearchField = ({ searchFilter, onChange }) => {
    return (
        <form>
            return (
            <div>
                <input
                    value={searchFilter}
                    placeholder="Search..."
                    onChange={(e) => onChange(e.target.value)}
                />
            </div>
            );
        </form>
    );
};

export default SearchField;
