import React, { useState } from 'react';
import FormMoose from '../form-moose/FormMoose';
import Form from '../form-moose/Form';
import Input from '../form-moose/Input';

function MooseFormContainer() {
  const initialValues = {
    userName: '',
    accept: false,
    countries: [],
    gender: '',
    location: '',
    comment: '',
  };

  const onSubmit = (e, values) => {
    e.preventDefault();
    console.log('ON SUBMIT CONTAINER', values);
  };
  return (
    <div>
      <h1>THIS IS THE MOOSE FORM CONTAINER</h1>
      <FormMoose
        initialValues={initialValues}
        onSubmit={onSubmit}
        // validationSchema={validationSchema}
      >
        <Form>
          <Input type="text" name="userName" className="form-control" />
          <button type="submit" className="btn btn-secondary btn-lg mt-2">
            Submit
          </button>
        </Form>
      </FormMoose>
    </div>
  );
}

export default MooseFormContainer;
