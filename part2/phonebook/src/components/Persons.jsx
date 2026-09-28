const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            name:{person.name} number:{person.number}
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
