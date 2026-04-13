function Button({ title = "Click Me", onClick, variant = "primary", fullWidth = false }) {

  function handleClick() {
    console.log("Button clicked!");
  }

  const primaryStyles = {
    backgroundColor: 'var(--accent)',
    color: 'white',
    padding: '0.75rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    width: fullWidth ? '100%' : 'auto',
  };

  const secondaryStyles = {
    backgroundColor: 'var(--card)',
    color: 'var(--primary)',
    padding: '0.75rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    fontWeight: '600',
    border: '1px solid var(--border)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    width: fullWidth ? '100%' : 'auto',
  };

  const getStyles = () => {
    return variant === 'secondary' ? secondaryStyles : primaryStyles;
  };

  return (
    <button
      style={getStyles()}
      onClick={onClick || handleClick}
      onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
      onMouseLeave={(e) => (e.target.style.opacity = '1')}
    >
      {title}
    </button>
  );
}

export default Button


