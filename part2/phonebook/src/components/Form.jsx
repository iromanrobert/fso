const Form = ({
  onSubmit,
  handleNewName,
  handleNewPhoneNumber,
  name,
  number,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={handleNewName} value={name} />
        phone:
        <input onChange={handleNewPhoneNumber} value={number} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};

export default Form;
