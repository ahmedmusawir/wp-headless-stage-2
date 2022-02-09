import React, { useState, useEffect } from 'react';
import Page from '../layouts/Page';
import Content from '../layouts/Content';
import { Row, Col } from 'react-bootstrap';
import Joi from 'joi-browser';
import InputImage from '../form-joi/InputImage';
import placeholderImage from '../../img/place-holder.png';
import InputJoi from '../form-joi/InputJoi';
import TextAreaJoi from '../form-joi/TextAreaJoi';

function FormBasic() {
  const [userName, setUserName] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [imageInfo, setImageInfo] = useState('');

  // FORM VALUE OBJECT
  const formValues = {
    userName: userName,
    accept: isChecked,
    gender: gender,
    location: location,
    comment: comment,
    imageUrl: imageUrl,
    fileSize: fileSize,
  };

  // JOI SCHEMA
  const schema = {
    userName: Joi.string().trim().required().label('User Name'),
    accept: Joi.boolean().valid(true),
    gender: Joi.string().required().label('Gender'),
    location: Joi.string().required().label('Location'),
    comment: Joi.string().required().label('Comment'),
    imageUrl: Joi.object().required().label('Featured Image'),
    fileSize: Joi.number().max(100000),
  };

  // VALIDATE ON SUBMIT
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(formValues, schema, options);

    if (!error) return null;

    const errors = {};

    for (let item of error.details) {
      switch (item.path[0]) {
        case 'accept':
          item.message = 'Must Accept Our Policy or Go to hell...';
          errors[item.path[0]] = item.message;
          break;

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

  // SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    // VALIDATING FORM DATA
    const errors = validate();
    // UPDATING ERRORS CONSTANT
    setErrors((prev) => errors || {});
    console.log('ERRORS IN HANDLE SUBMIT', errors);
    // IF ERRORS FOUND RETURN
    if (errors) return;

    // DISPLAY SUBMIT VALUE
    console.log('FORM VALUES SUBMITTED: ', formValues);
  };

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

    setImageUrl(e.target.files[0]);
    setFileSize(currentFileSize);
    setImageInfo({
      fileSize: currentFileSize,
      imageName: currentImageName,
    });
  };
  return (
    <Page wide={true} pageTitle="Form Basic">
      <Row className="justify-content-center">
        <Col sm={12}>
          <Content width="w-100" cssClassNames="bg-light">
            {/* SIMPLE FORM */}
            <form className="p-5 bg-light" onSubmit={handleSubmit}>
              {/* INPUT JOI */}
              <InputJoi
                hideLabel={false}
                label="User Name"
                type="text"
                name="userName"
                id="userName"
                placeholder="User Name"
                className="form-control"
                onChangeState={setUserName}
                error={errors.userName}
              />
              {/* IMAGE FILE INPUT */}
              <InputImage
                name="imageUrl"
                placeholderImage={placeholderImage}
                errors={errors}
                data={imageInfo}
                onChange={handleImageChange}
                className="form-control mb-3"
              />
              {/* CHECKBOX */}
              <div className="form-check pb-1 mb-2">
                <input
                  name="accept"
                  className="form-check-input"
                  type="checkbox"
                  checked={isChecked}
                  id="flexCheckDefault"
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Accept Privacy Policy
                </label>
                {errors.accept && (
                  <div className="alert alert-danger">{errors['accept']}</div>
                )}
              </div>
              {/* RADIO BUTTONS */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault1"
                  value="male"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'male'}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="flexRadioDefault2"
                  value="female"
                  onChange={(e) => setGender(e.target.value)}
                  checked={gender === 'female'}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Female
                </label>
                {errors.gender && (
                  <div className="alert alert-danger">{errors['gender']}</div>
                )}
              </div>
              <hr className="bg-primary" />
              {/* SELECT BOX */}
              <select
                name="location"
                className="form-control"
                aria-label="Default select example"
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="">Choose A Location</option>
                <option value="paris">Paris</option>
                <option value="kuala lumpur">KL</option>
                <option value="sarasota">Sarasota</option>
              </select>
              {errors.location && (
                <div className="alert alert-danger">{errors['location']}</div>
              )}
              {/* TEXT AREA */}
              <TextAreaJoi
                hideLabel={false}
                label="Leave A Comment"
                name="comment"
                placeholder="Leave A Comment"
                className="form-control"
                rows={3}
                onChangeState={setComment}
                error={errors.comment}
              />

              <hr className="bg-primary" />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
              <button className="btn btn-warning ml-1" type="reset">
                Reset
              </button>
            </form>
          </Content>
        </Col>
      </Row>
    </Page>
  );
}

export default FormBasic;
