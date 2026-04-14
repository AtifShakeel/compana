import React from 'react'

function Checkbox({ checked = false, onChange }) {
  const checkboxStyles = {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
    accentColor: 'var(--accent)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)',
    transition: 'all 0.2s ease',
  };

  return (
    <input
      type="checkbox"
      style={checkboxStyles}
      checked={checked}
      onChange={onChange}
    />
  );
}

export default Checkbox
