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

  // Show all items from server
  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  // Add a name to the phonebook
  const addName = (event) => {
    event.preventDefault();

    const nameOnList = persons.some((person) => person.name === newName);

    // If the new name already exists in phonebook, then existing contact number can be changed
    if (nameOnList) {
      const replaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if(replaceNumber) {
        const nameObject = {
          name: newName,
          number: newNumber,
        }
        
        const idToUpdate = persons.find((person) => person.name === newName).id

        personService
          .update(idToUpdate, nameObject)
          .then(response => {
                  const updatedList = persons.map(person =>
                    person.name === newName ? {...person, number: newNumber} : person
                )
                setPersons(updatedList)
                setNewName("")
                setNewNumber("")
              })
          .catch(error => {
            console.log('Contact update error:', error)
          })
          
      }

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

  // Delete a name from the phonebook
  const deleteName = (id) => {
      const confirmed = window.confirm('Do you want to delete this contact from Phonebook?')
    
     
    if (confirmed) {
        personService
        .remove(id)
        .then(response => {
          console.log(`Contact successfully deleted`)
          setPersons(persons.filter((person) => person.id !== id))
        })
        .catch(error => {
          console.log('Contact deletion error', error)
        })
    }
  }

  // Event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  // Filter for names to appear on phonebook
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
      <Persons persons={namesToShow} deleteName={deleteName} />
    </div>
  );
};

export default App;
