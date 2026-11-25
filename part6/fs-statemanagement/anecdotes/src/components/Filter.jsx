import { useFilter, useAnecdotesActions } from "../store";

const Filter = () => {
  const { setFilter } = useAnecdotesActions();
  const filter = useFilter();

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter{" "}
      <input
        name="filter"
        value={filter}
        onChange={handleChange}
        data-testid="filter"
      />
    </div>
  );
};

export default Filter;
