import React from "react";

const Tdo = ({ todo, done }) => {
  return (
    <div
      style={{
        color: `${done ? `green` : `red`}`,
      }}
    >
      {done || todo}
    </div>
  );
};

export default Tdo;
