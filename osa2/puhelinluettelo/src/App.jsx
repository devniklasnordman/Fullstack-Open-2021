import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const onList = persons.some(person => 
      person.name === newName)

      if(onList) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const nameObject = {
          name: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
  }
}
  
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
                  value={newName} 
                  onChange={handleNameChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
      <div>console.log: {newName}</div>
    </div>
  )
}

export default App