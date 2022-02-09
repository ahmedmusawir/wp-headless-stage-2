import React, { useState } from 'react';
import Page from '../layouts/Page';
import Content from '../layouts/Content';
import { Row, Col } from 'react-bootstrap';
import Joi from 'joi-browser';
import placeholderImage from '../../img/place-holder.png';

function FormJoi({ postId }) {
  const [errors, setErrors] = useState('');
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

  // const schema = Joi.object({
  //   title: Joi.string().trim().required().label('Title'),
  //   content: Joi.string().required().label('Content'),
  //   imageUrl: Joi.object().required().label('Featured Image'),
  //   fileSize: Joi.number().max(100000),
  //   imageName: Joi.string().trim().required(),
  // });

  // const validate = () => {
  //   // console.log('IMAGE OBJ IN VALIDATE:', data.imageUrl);
  //   const options = { abortEarly: false };
  //   const { error } = Joi.validate(data, schema, options);
  //   if (!error) return null;

  //   const errors = {};

  //   for (let item of error.details) {
  //     if (item.path[0] === 'imageUrl') {
  //       item.message = 'Featued Image must be an Image File';
  //       errors[item.path[0]] = item.message;
  //     } else if (item.path[0] === 'fileSize') {
  //       item.message = 'Featued Image must be smaller than 100 Kelobytes';
  //       errors[item.path[0]] = item.message;
  //     } else {
  //       errors[item.path[0]] = item.message;
  //     }
  //   }
  //   return errors;
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('IMAGE URL: ', data.imageUrl);

  //   // VALIDATING FORM DATA
  //   const errors = validate();
  //   // UPDATING ERRORS CONSTANT
  //   setErrors(errors);
  //   console.log('ERRORS FROM HANDLE SUBMIT:', errors);
  //   // IF ERRORS FOUND RETURN
  //   if (errors) return;

  //   console.log('Submitted', data);
  // };

  // const validateProperty = ({ name, value }) => {
  //   const obj = { [name]: value };
  //   console.log('VALIDATE PROPERTY', obj);

  //   const inputSchema = { [name]: schema[name] };
  //   // console.log('VALIDATE PROPERTY INPUT SCHEMA', inputSchema);

  //   const { error } = Joi.validate(obj, inputSchema);
  //   if (error)
  //     console.log('VALIDATE PROPERTY SCHEMA ERROR', error.details[0].message);

  //   return error ? error.details[0].message : null;
  // };

  // const handleChange = ({ currentTarget: input }) => {
  //   const inputErrors = { ...errors };
  //   const errorMessage = validateProperty(input);

  //   console.log('HANDLE CHANGE INPUT', input.name);
  //   console.log('HANDLE CHANGE INPUT', input.value);
  //   console.log('HANDLE CHANGE ERRORS', inputErrors);

  //   if (errorMessage) errors[input.name] = errorMessage;
  //   else delete inputErrors[input.name];

  //   const inputData = { ...data };
  //   inputData[input.name] = input.value;

  //   setData(inputData);
  //   setErrors(inputErrors);
  //   console.log('HANDLE CHANGE ERROR', errors);
  // };

  const [myErr, setMyErr] = useState({});

  const validateProp = ({ name, value }) => {
    if (name === 'title') {
      if (value.trim() === '') return 'Title is Required';
    }
    if (name === 'content') {
      if (value.trim() === '') return 'Content is Required';
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const errs = { ...myErr };

    const errMsg = validateProp(input);
    if (errMsg) errs[input.name] = errMsg;
    else delete errs[input.name];

    setMyErr(errs);

    console.log(errMsg);
    console.log(errs);
  };

  return (
    <Page wide={true} pageTitle="Movie Form">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-75" cssClassNames="mt-2 mx-auto">
            <form className="form">
              {/* <form onSubmit={handleSubmit} className="form"> */}
              <label className="font-weight-bold" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Title"
                className="form-control mb-3"
                // value={data.title}
                onChange={handleChange}
                // onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              {myErr.title && (
                <div className="alert alert-danger">{myErr['title']}</div>
              )}
              {errors.title && (
                <div className="alert alert-danger">{errors['title']}</div>
              )}

              <label className="font-weight-bold" htmlFor="featured-image">
                Featured Image:
              </label>
              <input
                type="file"
                name="imageUrl"
                id="featured"
                className="form-control mb-3"
                onChange={(e) => {
                  const [file] = e.target.files;
                  const desktopImg = document.getElementById('desktop-img');
                  if (file) {
                    desktopImg.src = URL.createObjectURL(file);
                    console.log('LOCAL IMAGE', desktopImg.src);
                  }
                  const currentFileSize = Number(e.target.files[0].size);
                  const currentImageName = e.target.files[0].name;

                  console.log('IMAGE NAME:', currentImageName);

                  setData({
                    ...data,
                    imageUrl: e.target.files[0],
                    fileSize: currentFileSize,
                    imageName: currentImageName,
                  });
                  console.log('DATA IN ONCHANGE:', data);
                }}
              />
              {errors && errors.imageUrl && !data.imageName && (
                <div className="alert alert-danger">{errors['imageUrl']}</div>
              )}

              {errors && errors.fileSize && Number(data.fileSize) > 100000 && (
                <div className="alert alert-danger">{errors['fileSize']}</div>
              )}

              <figure>
                {/* DISPLAY Featured Image</h6> */}
                <img
                  id="desktop-img"
                  src={placeholderImage}
                  alt=""
                  width={100}
                  height={100}
                />
              </figure>
              <label className="font-weight-bold" htmlFor="content">
                Content
              </label>
              <textarea
                name="content"
                id="content"
                placeholder="Enter Content"
                cols="30"
                rows="10"
                className="form-control mb-3"
                // value={data.content}
                onChange={handleChange}
                // onChange={(e) => setData({ ...data, content: e.target.value })}
              ></textarea>
              {errors && (
                <div className="alert alert-danger">{errors['content']}</div>
              )}
              {myErr.content && (
                <div className="alert alert-danger">{myErr['content']}</div>
              )}

              <button className="btn btn-info btn-block btn-lg" type="submit">
                Update Now!
              </button>
            </form>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default FormJoi;
