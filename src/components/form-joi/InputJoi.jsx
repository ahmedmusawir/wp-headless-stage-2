import React from 'react';

function InputJoi({
  type,
  name,
  label,
  hideLabel,
  placeholder,
  value,
  error,
  onChangeState,
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
        onChange={(e) => onChangeState(e.target.value)}
      />

      {error && <div className="alert alert-info">{error}</div>}
    </div>
  );
}

export default InputJoi;
