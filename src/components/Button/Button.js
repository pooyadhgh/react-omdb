import classes from './Button.module.css';

const Button = ({
  href,
  children,
  className = '',
  type,
  onClick,
  disabled,
}) => {
  if (href) {
    return (
      <a
        href={href}
        className={`${classes.button} ${className}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={`${classes.button} ${className} `}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
