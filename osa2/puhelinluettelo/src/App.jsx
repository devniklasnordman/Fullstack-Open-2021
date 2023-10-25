import { useState, useEffect } from "react";
import axios from 'axios'
import FilterInput from "./components/FilterInput";
import NameForm from "./components/NameForm";
import Persons from "./components/Persons";
import personService from "./services/personService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();

    const nameOnList = persons.some((person) => person.name === newName);

    if (nameOnList) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };

      personService
        .create(nameObject)
        .then(response => {
          setPersons([...persons, response])
          setNewName("");
          setNewNumber("");
        })
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const namesToShow = !showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().startsWith(newFilter.toLowerCase())
      );

  return (
    <div>
      <FilterInput value={newFilter} onChange={handleFilterChange} />
      <h2>Phonebook</h2>
      <NameForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={namesToShow} />
    </div>
  );
};

export default App;
