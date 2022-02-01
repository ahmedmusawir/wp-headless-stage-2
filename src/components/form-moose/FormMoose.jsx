import React, { createContext, useState, useEffect } from 'react';

export const MooseFormContext = createContext();

function FormMoose({ initialValues, onSubmit, children }) {
  const [formData, setFormData] = useState(initialValues);
  return (
    <MooseFormContext.Provider value={{ formData, setFormData, onSubmit }}>
      {children}
    </MooseFormContext.Provider>
  );
}

export default FormMoose;
