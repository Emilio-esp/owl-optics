import React, { useState } from 'react';
import styled from 'styled-components';

const Select = ({ label, options, handleOnchange, defaultValueSelected }) => {

  const [optionSelected, setOptionSelected] = useState(defaultValueSelected);

  const handleOnchangeEvent = (e) => {
    const country = e.target.value;
    setOptionSelected(country);
    handleOnchange(country, label);
  };

  return (
    <div className="flex flex-wrap flex-col sm:flex-row content-around items-baseline p-1">
      <label className="form-label flex-1 p-1">{label}</label>
      <SelectTag
        className="w-full p-1 sm:px-0"
        onChange={(e) => handleOnchangeEvent(e)}
        value={optionSelected}
      >
        <option defaultValue disabled value="default">
          -- Select your {label} --
        </option>
        {options.map((op) => (
          <option key={op.code} value={op.code}>
            {op.name}
          </option>
        ))}
      </SelectTag>
    </div>
  );
};


const SelectTag = styled.select`
    border:1px solid gray;
    height:1.7rem;
    font-family:arial;
    font-size: 0.9rem;
    flex:2;

    &:focus{
        outline:none;
    }
`;
export default Select
