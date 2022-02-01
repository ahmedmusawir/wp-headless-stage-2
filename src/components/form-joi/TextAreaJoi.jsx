import React from 'react';

function TextAreaJoi({
  name,
  label,
  hideLabel,
  placeholder,
  value,
  cols,
  rows,
  error,
  onChangeState,
  className,
}) {
  return (
    <div>
      {!hideLabel && (
        <label className="font-weight-bold mt-2" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        className={className}
        value={value}
        cols={cols}
        rows={rows}
        onChange={(e) => onChangeState(e.target.value)}
      ></textarea>

      {error && <div className="alert alert-info">{error}</div>}
    </div>
  );
}

export default TextAreaJoi;
