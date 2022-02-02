import React from 'react';

function InputImage({
  name,
  placeholderImage,
  errors,
  data,
  onChange,
  className,
}) {
  return (
    <div>
      <label className="font-weight-bold" htmlFor="featured-image">
        Featured Image:
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className={className}
        onChange={onChange}
      />

      {errors.imageUrl && !data.imageName && (
        <div className="alert alert-danger">{errors.imageUrl}</div>
      )}

      {errors.fileSize && Number(data.fileSize) > 100000 && (
        <div className="alert alert-danger">{errors.fileSize}</div>
      )}

      <figure>
        {/* DISPLAY Featured Image */}
        <img
          id="desktop-img"
          src={placeholderImage}
          alt=""
          width={100}
          height={100}
        />
      </figure>
    </div>
  );
}

export default InputImage;
