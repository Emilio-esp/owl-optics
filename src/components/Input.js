import React from "react";
import styled from "styled-components";

const Input = ({
  label,
  labelFor,
  name,
  type,
  placeholder,
  value,
  updateValue,
  error,
  ...rest
}) => {
  return (
    <div className="flex flex-wrap flex-col sm:flex-row content-around items-baseline p-1">
      <label htmlFor={labelFor} className="form-label flex-1 p-1">
        {label}
      </label>
      <InputContainer className="p-1">
        <InputTag
          {...rest}
          autoComplete="off"
          className="form-input border border-gray-600 h-6 focus:outline-none"
          id={labelFor}
          type={type}
          name={name}
          value={value}
          onChange={(e) => updateValue(e)}
          placeholder={placeholder}
        />
        {error?.isCorrect === false && (
          <Span className="text-red-500">{error.message}</Span>
        )}
      </InputContainer>
    </div>
  );
};

const InputContainer = styled.div`
    flex: 2;
    width:100%;
`;

const InputTag = styled.input.attrs({ type: "text" })`
  padding:1rem 0.5rem;
  font-family: arial;
  font-size: 0.9rem;
  width:100%;
`;


const Span = styled.p`
    font-family:Arial, Helvetica, sans-serif;
    font-size:0.8rem;
`;

export default Input;
