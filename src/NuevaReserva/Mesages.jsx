import React from 'react';

const Messages = ({ success, error }) => {
  return (
    <>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
export default Messages