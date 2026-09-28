const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            name:{person.name} number:{person.phone}
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
