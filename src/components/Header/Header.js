import classes from './Header.module.css';
import NavLinks from '../NavLinks/NavLinks';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1 className={classes.brand}>
        <a href="/">The Open Movie Database</a>
      </h1>
      <nav className={classes['nav-bar']}>
        <NavLinks />
      </nav>
    </header>
  );
};

export default Header;
