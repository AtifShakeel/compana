import React, { useState } from 'react';

function Input({ id, placeholder = "Enter text", value, onChange, type = "text" }) {
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontFamily: 'var(--font-body)',
    color: 'var(--text)',
    backgroundColor: 'var(--card)',
    border: isFocused ? '2px solid var(--accent)' : '1px solid var(--border)',
    transition: 'all 0.2s ease',
    outline: 'none',
  };

  return (
    <input
      id={id}
      type={type}
      style={inputStyles}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
}

export default Input
