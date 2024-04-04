interface ButtonProps {
  className: string;
  buttonName: string;
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
}

const Button = ({ className, buttonName, handleClick }: ButtonProps) => {
  return (
    <button onClick={handleClick} className={className}>
      {buttonName}
    </button>
  );
};

export default Button;
