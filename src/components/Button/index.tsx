interface ButtonProps {
  type: string;
  className: string;
  buttonName?: string;
  handleClick: (
    e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>
  ) => void | Promise<void>;
  icon?: React.ReactNode;
}

const Button = ({
  type,
  className,
  buttonName,
  handleClick,
  icon,
}: ButtonProps) => {
  const renderButton = () => {
    switch (type) {
      case "icon":
        return (
          <button onClick={handleClick} className={className}>
            {icon}
          </button>
        );
      case "text-lg":
        return (
          <button onClick={handleClick} className={className}>
            {buttonName}
          </button>
        );
    }
  };
  return <>{renderButton()}</>;
};

export default Button;
