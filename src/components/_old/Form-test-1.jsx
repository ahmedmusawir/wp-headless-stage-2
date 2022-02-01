import React, { Children } from 'react';

function Form({ data, setData, children }) {
  const obj = {
    apple: '123',
    carrot: 'in the a',
  };

  console.log('SetData From FORM', data);

  return (
    <div>
      <h1>This is the form Comp</h1>
      {children}
      <button onClick={() => setData({ ...data, obj })}>Update Data</button>
    </div>
  );
}

export default Form;
