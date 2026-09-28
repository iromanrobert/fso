import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import phoneService from "./service/phone";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showFilterd, setShowFiltered] = useState("");

  useEffect(() => {
    phoneService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addNewName = (e) => {
    e.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} already exists in the phonebook`);
      return;
    }
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };

    phoneService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
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
