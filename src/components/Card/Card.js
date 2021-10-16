import classes from './Card.module.css';

const Card = ({ children, className = '' }) => {
  return (
    <section className={`${classes.card} ${className}`}>{children}</section>
  );
};

export default Card;
