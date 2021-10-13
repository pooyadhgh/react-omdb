import classes from './Button.module.css';
import { Link } from 'react-router-dom';

const Button = ({
  href,
  children,
  className = '',
  type,
  onClick,
  disabled,
  to,
}) => {
  if (href) {
    return (
      <button className={`${classes.button} ${className}`}>
        <a href={href}>{children}</a>
      </button>
    );
  }

  if (to) {
    return (
      <Link to={to} className={`${classes.button} ${className}`}>
        {children}
      </Link>
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
