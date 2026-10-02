import { useState, useEffect } from "react";
import "./index.css";

import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneService from "./service/phone";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [showFilterd, setShowFiltered] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  const showNotification = (message, type = "info") => {
    setNotificationMessage({ message, type });
    setTimeout(() => setNotificationMessage(null), 3000);
  };

  useEffect(() => {
    phoneService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addNewName = (e) => {
    e.preventDefault();

    const existing = persons.find((person) => person.name === newName);
    if (existing) {
      console.log(existing);
      if (
        window.confirm(
          `${newName} is already added to the phonbook, replace old number?`,
        )
      ) {
        phoneService
          .update(existing.id, {
            ...existing,
            number: newPhoneNumber,
          })
          .then((returnedPerson) => {
            console.log(persons);
            setPersons(
              persons.map((p) => (p.id !== existing.id ? p : returnedPerson)),
            );
            setNewName("");
            setNewPhoneNumber("");
          });
      }
      return;
    }
    const personObject = {
      name: newName,
      number: newPhoneNumber,
    };

    phoneService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewPhoneNumber("");
      showNotification(
        `Added ${returnedPerson.name} to the phonebook`,
        "success",
      );

      setTimeout(() => {
        setNotificationMessage(null);
      }, 2000);
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

  const deleteUser = (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) return;
    phoneService
      .remove(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        showNotification(`${name} already removed from the database`, "error");
      });
  };
  return (
    <div className="phonebook">
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterResults} />
      <Form
        onSubmit={addNewName}
        handleNewName={handleNewName}
        handleNewPhoneNumber={handleNewPhoneNumber}
        name={newName}
        number={newPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={showFilterdElements} deletePersons={deleteUser} />
      <Notification
        message={notificationMessage?.message ?? null}
        type={notificationMessage?.type}
      />
    </div>
  );
};

export default App;
