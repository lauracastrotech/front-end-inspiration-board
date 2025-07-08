import React from 'react';

const SortDropdown = ({ options, onChange }) => {
  return (
    <select onChange={onChange} defaultValue="">
      <option value="" disabled>-- Sort By: --</option>
      {options.map(({ title }, index) => (
        <option key={index} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;