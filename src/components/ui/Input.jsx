// src/components/ui/Input.jsx

import React from 'react';

const Input = ({ name, value, onChange, placeholder, error }) => {
  const isDniField = name === 'dni';

  return (
    <div className="input-group">
      {isDniField && (
        <select className="input-group__select">
          <option value="DNI">DNI</option>
          <option value="CE">C.E.</option>
        </select>
      )}
      
      <input
        type={name === 'phone' ? 'tel' : 'text'}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-group__field ${error ? 'input-group__field--error' : ''}`}
        maxLength={name === 'dni' ? 8 : (name === 'phone' ? 9 : undefined)}
      />
      {error && <p className="input-group__error-message">{error}</p>}
    </div>
  );
};

export default Input;