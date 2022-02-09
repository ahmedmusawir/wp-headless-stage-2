import React, { useState } from 'react';
import Page from '../layouts/Page';
import Content from '../layouts/Content';
import { Row, Col } from 'react-bootstrap';
import Joi from 'joi-browser';
import placeholderImage from '../../img/place-holder.png';
import Input from '../form-joi/Input';
import TextArea from '../form-joi/TextArea';
import InputImage from '../form-joi/InputImage';
import Form, { InputField } from '../form-joi/Form';

function FormJoi() {
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    title: '',
    content: '',
    imageUrl: '',
    fileSize: '',
    imageName: '',
  });

  const schema = {
    title: Joi.string().trim().required().label('Title'),
    content: Joi.string().required().label('Content'),
    imageUrl: Joi.object().required().label('Featured Image'),
    fileSize: Joi.number().max(100000),
    imageName: Joi.string().trim().required(),
  };

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('IMAGE URL: ', data.imageUrl);

  //   // VALIDATING FORM DATA
  //   const errors = validate();
  //   // UPDATING ERRORS CONSTANT
  //   setErrors((prev) => errors || {});
  //   console.log('ERRORS IN HANDLE SUBMIT', errors);
  //   // IF ERRORS FOUND RETURN
  //   if (errors) return;

  //   console.log('Submitted', data);
  // };

  // const validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   const inputSchema = { [name]: schema[name] };
  //   const { error } = Joi.validate(obj, inputSchema);

  //   return error ? error.details[0].message : null;
  // };

  // const handleChange = ({ currentTarget: input }) => {
  //   const errs = { ...errors };
  //   const formData = { ...data };

  //   const errMsg = validateProperty(input);
  //   if (errMsg) errs[input.name] = errMsg;
  //   else delete errs[input.name];

  //   formData[input.name] = input.value;

  //   setErrors(errs);
  //   setData(formData);
  // };

  const handleImageChange = (e) => {
    const [file] = e.target.files;
    const desktopImg = document.getElementById('desktop-img');
    if (file) {
      desktopImg.src = URL.createObjectURL(file);
    }
    const currentFileSize = Number(e.target.files[0].size);
    const currentImageName = e.target.files[0].name;

    if (currentFileSize > 100000) {
      setErrors({
        ...errors,
        fileSize: 'Featued Image must be smaller than 100 Kelobytes',
      });
    }

    setData({
      ...data,
      imageUrl: e.target.files[0],
      fileSize: currentFileSize,
      imageName: currentImageName,
    });
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-75" cssClassNames="mt-2 mx-auto">
            <Form
              data={data}
              setData={setData}
              errors={errors}
              setErrors={setErrors}
              schema={schema}
            >
              <InputField
                data={data}
                setData={setData}
                errors={errors}
                setErrors={setErrors}
                schema={schema}
              />
              {/* <Input
                type="text"
                name="title"
                hideLabel={false}
                label="Title"
                placeholder="Enter Title"
                className="form-control mb-3"
                value={data.title}
                error={errors.title}
                onChange={handleChange}
              /> */}
              <button className="btn btn-dark btn-block btn-lg" type="submit">
                Update From Parent
              </button>
            </Form>
            {/* <form onSubmit={handleSubmit} className="form">
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

              <InputImage
                name="imageUrl"
                placeholderImage={placeholderImage}
                errors={errors}
                data={data}
                onChange={handleImageChange}
                className="form-control mb-3"
              />

              <TextArea
                name="content"
                hideLabel={false}
                label="Content"
                placeholder="Enter Content"
                className="form-control mb-3"
                value={data.content}
                cols="30"
                rows="5"
                error={errors.content}
                onChange={handleChange}
              />

              <button className="btn btn-info btn-block btn-lg" type="submit">
                Update Now!
              </button>
            </form> */}
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default FormJoi;
