import React from "react";
// You can add a CSS module here if you want to style it with CSS Modules later,
// e.g., import styles from "./Button.module.css";

function Button({ children, onClick }) {
  return (
    // Using inline styles for simplicity since a Button.module.css wasn't found.
    // You can replace these with classes from Button.module.css if you create one.
    <button
      onClick={onClick}
      style={{
        backgroundColor: 'black',
        color: '#2E8B57', // A shade of green for the text
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        fontFamily: 'Poppins, sans-serif', // Assuming Poppins for buttons
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'black'}
    >
      {children}
    </button>
  );
}

export default Button;
