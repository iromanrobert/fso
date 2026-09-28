import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

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
      <Filter onChange={handleFilterResults} />
      <Form
        onSubmit={addNewName}
        handleNewName={handleNewName}
        handleNewPhoneNumber={handleNewPhoneNumber}
        name={newName}
        number={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={showFilterdElements} />
    </div>
  );
};

export default App;
