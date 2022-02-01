import React, { useContext } from 'react';
import { MooseFormContext } from './FormMoose';

function Form({ children }) {
  const { initialValues, formData, onSubmit } = useContext(MooseFormContext);
  return (
    <form onSubmit={(e) => onSubmit(e, formData)} className="p-5 bg-light">
      {children}
    </form>
  );
}

export default Form;
