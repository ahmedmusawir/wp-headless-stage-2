import React from 'react';

function TextArea({
  name,
  label,
  hideLabel,
  placeholder,
  value,
  cols,
  rows,
  error,
  onChange,
  className,
}) {
  return (
    <div>
      {!hideLabel && (
        <label className="font-weight-bold" htmlFor={name}>
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
        onChange={onChange}
      ></textarea>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default TextArea;
