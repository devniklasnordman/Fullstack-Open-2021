/*
  Filename: FilterInput.jsx
  Purpose: This component is an input that handles filtering names of a list
  Author: Niklas Nordman
  Created: 25th October 2023
*/

const FilterInput = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input value={value} onChange={onChange} />
    </div>
  );
};

export default FilterInput;
