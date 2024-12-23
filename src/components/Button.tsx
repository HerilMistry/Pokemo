import React from "react";

interface ButtonProps {
  children: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="btn btn-primary mt-3" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
