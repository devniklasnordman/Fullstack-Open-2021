/*
File: Persons.jsx
Purpose: This component renders the names of the phonebook
Author: Niklas Nordman
Created: 25th October 2023
*/

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
