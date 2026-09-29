const Persons = ({ persons, deletePersons }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <li key={person.id}>
            {person.name} {person.number}{" "}
            <button onClick={() => deletePersons(person.id, person.name)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Persons;
