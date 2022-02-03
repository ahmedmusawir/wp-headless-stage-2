import React, { useState } from 'react';
import placeholderImage from '../../img/place-holder.png';

function InputImageJoi({
  name,
  errors,
  className,
  updateErrors,
  updateImageUrl,
  updateFileSize,
  lastImage,
}) {
  const [imageInfo, setImageInfo] = useState('');

  const handleImageChange = (e) => {
    const [file] = e.target.files;
    const desktopImg = document.getElementById('desktop-img');
    if (file) {
      desktopImg.src = URL.createObjectURL(file);
    }
    const currentFileSize = Number(e.target.files[0].size);
    const currentImageName = e.target.files[0].name;

    if (currentFileSize > 100000) {
      updateErrors({
        ...errors,
        fileSize: 'Featued Image must be smaller than 100 Kelobytes',
      });
    }

    updateImageUrl(e.target.files[0]);
    updateFileSize(currentFileSize);
    setImageInfo({
      fileSize: currentFileSize,
      imageName: currentImageName,
    });
  };
  return (
    <div>
      <label className="font-weight-bold mt-3" htmlFor="featured-image">
        Featured Image:
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className={className}
        onChange={handleImageChange}
      />

      {errors.imageUrl && !imageInfo.imageName && (
        <div className="alert alert-info">{errors.imageUrl}</div>
      )}

      {errors.fileSize && Number(imageInfo.fileSize) > 100000 && (
        <div className="alert alert-info">{errors.fileSize}</div>
      )}

      <figure>
        {/* DISPLAY Featured Image */}
        <img
          id="desktop-img"
          src={lastImage ? lastImage : placeholderImage}
          alt=""
          width={100}
          height={100}
        />
      </figure>
    </div>
  );
}

export default InputImageJoi;
