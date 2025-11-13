// src/components/ui/Button.jsx

import React from 'react';

const Button = ({ children, type = 'button', onClick, variant = 'primary' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn--${variant}`}
    >
      {children}
    </button>
  );
};

export default Button;