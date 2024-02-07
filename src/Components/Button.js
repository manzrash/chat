import React from "react";

const Button = ({ handleClick, name, btnType }) => {
  return (
    <button className={btnType} onClick={handleClick}>
      {name}
    </button>
  );
};

export default Button;
