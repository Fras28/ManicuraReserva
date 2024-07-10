import React from "react";

const BottomNav = () => {
  return (
    <div style={styles.container}>
      <button style={styles.button}>x</button>
      <button style={styles.button}>x</button>
      <button style={styles.button}>x</button>
      <button style={styles.button}>x</button>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "whitesmoke",
    boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)"
  },
  button: {
    backgroundColor: "#282c34",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer"
  }
};

export default BottomNav;
