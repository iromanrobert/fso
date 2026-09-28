import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showFilterd, setShowFiltered] = useState("");

  const addNewName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhoneNumber,
      id: String(persons.length + 1),
    };

    persons.forEach((person) => {
      if (person.name === newName) {
        alert(`${person.name} already exsists in the phonebook`);
      } else {
        setPersons(persons.concat(personObject));
      }
      setNewName("");
    });
  };

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleNewPhoneNumber = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleFilterResults = (e) => {
    setShowFiltered(e.target.value);
  };

  const showFilterdElements = persons.filter((person) =>
    person.name.toLowerCase().includes(showFilterd.toLowerCase()),
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterResults} />
      </div>
      <form onSubmit={addNewName}>
        <div>
          name: <input onChange={handleNewName} value={newName} />
          phone:
          <input onChange={handleNewPhoneNumber} value={newPhoneNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {showFilterdElements.map((person) => {
          return (
            <li key={person.id}>
              name:{person.name} number:{person.phone}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
