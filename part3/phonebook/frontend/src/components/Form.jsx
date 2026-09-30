const Form = ({
  onSubmit,
  handleNewName,
  handleNewPhoneNumber,
  name,
  number,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="inputs">
        <div className="input-group">
          <label htmlFor="">Name</label>
          <input onChange={handleNewName} value={name} />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input onChange={handleNewPhoneNumber} value={number} />
        </div>
      </div>
      <button type="submit">Add phone number</button>
    </form>
  );
};

export default Form;
