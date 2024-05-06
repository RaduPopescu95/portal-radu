const SearchBox = ({ onSearchChange }) => {
  return (
    <form
      className="d-flex flex-wrap align-items-center my-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder="Cauta..."
        aria-label="Search"
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className=" my-2 my-sm-0" type="submit">
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchBox;
