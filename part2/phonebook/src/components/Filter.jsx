const Filter = ({ onChange }) => {
  return (
    <div className="input-group">
      <label>Search Number</label>
      <input onChange={onChange} />
    </div>
  );
};

export default Filter;
