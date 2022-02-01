import React, { Children } from 'react';
import Joi from 'joi-browser';
import Input from '../form-joi/Input';

function Form({ data, setData, schema, errors, setErrors, children }) {
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      if (item.path[0] === 'imageUrl') {
        item.message = 'Featued Image must be an Image File';
        errors[item.path[0]] = item.message;
      } else {
        errors[item.path[0]] = item.message;
      }
    }
    return errors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('IMAGE URL: ', data.imageUrl);

    // VALIDATING FORM DATA
    const errors = validate();
    // UPDATING ERRORS CONSTANT
    setErrors((prev) => errors || {});
    console.log('ERRORS IN HANDLE SUBMIT', errors);
    // IF ERRORS FOUND RETURN
    if (errors) return;

    console.log('Submitted', data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <h1>This is the form Comp</h1>
        {children}
      </form>
    </div>
  );
}

export const InputField = ({ data, setData, errors, setErrors, schema }) => {
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const inputSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, inputSchema);

    return error ? error.details[0].message : null;
  };

  const handleChange = ({ currentTarget: input }) => {
    const errs = { ...errors };
    const formData = { ...data };

    const errMsg = validateProperty(input);
    if (errMsg) errs[input.name] = errMsg;
    else delete errs[input.name];

    formData[input.name] = input.value;

    setErrors(errs);
    setData(formData);
  };
  return (
    <>
      <Input
        type="text"
        name="title"
        hideLabel={false}
        label="Title"
        placeholder="Enter Title"
        className="form-control mb-3"
        value={data.title}
        error={errors.title}
        onChange={handleChange}
      />
    </>
  );
};

export default Form;
