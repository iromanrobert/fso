import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const addNewName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      phone: newPhoneNumber,
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

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) => {
          return (
            <li key={person.name}>
              name:{person.name} number:{person.phone}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
