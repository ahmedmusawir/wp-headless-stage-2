import React from 'react';

function Input({
  type,
  name,
  label,
  hideLabel,
  placeholder,
  value,
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
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={onChange}
      />

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
