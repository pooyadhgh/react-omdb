import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './SearchResult.module.css';

const SearchResult = ({ resultId }) => {
  return (
    <Card>
      <h2>Search result</h2>
      <p>{resultId}</p>
      <Button className={classes.button}>Detail</Button>
    </Card>
  );
};

export default SearchResult;
