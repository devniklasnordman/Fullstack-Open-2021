/*
File: NameForm.jsx
Purpose: This form handles adding new names to the phonebook
Author: Niklas Nordman
Created: 25th October 2023
*/

const NameForm = ({
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
  addName,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} name='nameInput' />
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} name='numberInput'/>
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default NameForm;
