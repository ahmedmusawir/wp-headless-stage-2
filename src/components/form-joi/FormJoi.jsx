import React from 'react';
import Joi from 'joi-browser';

function FormJoi({ data, schema, setErrors, doSubmit, children }) {
  // VALIDATE ON SUBMIT
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      switch (item.path[0]) {
        case 'imageUrl':
          item.message = 'Must Upload a Featured Image';
          errors[item.path[0]] = item.message;
          break;

        case 'fileSize':
          item.message = 'Featued Image must be smaller than 100 Kelobytes';
          errors[item.path[0]] = item.message;
          break;

        default:
          errors[item.path[0]] = item.message;
          break;
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATING FORM DATA
    const errors = validate();
    // UPDATING ERRORS CONSTANT
    setErrors((prev) => errors || {});
    console.log('ERRORS IN HANDLE SUBMIT', errors);
    // IF ERRORS FOUND RETURN
    if (errors) return;

    // CALLING DO SUBMIT
    doSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-light">
      {children}
    </form>
  );
}

export default FormJoi;
