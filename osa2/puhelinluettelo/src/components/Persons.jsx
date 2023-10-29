/*
File: Persons.jsx
Purpose: This component renders the names of the phonebook
Author: Niklas Nordman
Created: 25th October 2023
*/

const Persons = ({ persons, deleteName }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => deleteName(person.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
