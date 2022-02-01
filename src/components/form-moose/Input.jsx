import React, { useContext, useState } from 'react';
import { MooseFormContext } from './FormMoose';

function Input({ type, name, className }) {
  const { formData, setFormData, onSubmit } = useContext(MooseFormContext);

  const handleChange = ({ currentTarget: input }) => {
    const data = { ...formData };
    data[input.name] = input.value;
    console.log(data);
    setFormData(data);
  };

  return (
    <input
      type={type}
      name={name}
      className={className}
      onChange={handleChange}
      // onChange={(e) => setUserName(e.target.value)}
    />
  );
}

export default Input;
