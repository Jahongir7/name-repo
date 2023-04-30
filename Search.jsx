const Search = ({ value, setValue, setSearch }) => {
  function handleChange(event) {
    setValue(event.target.value.toUpperCase().replaceAll(" ", ""));
  }
  function handleClick() {
    setSearch(true);
  }

  return (
    <div>
      <input
        placeholder="Enter a name"
        value={value}
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setSearch(true);
          }
        }}
      />
      <button onClick={handleClick}>Search</button>
    </div>
  );
};

export default Search;
