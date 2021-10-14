import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './SearchHistory.module.css';

const SearchHistory = ({ histories, onClear }) => {
  return (
    <Card>
      <h2>Search history</h2>
      <ul>
        {histories.map(history => {
          return (
            <li key={history.item.imdbID}>
              {history.item.imdbID} - {history.date}
            </li>
          );
        })}
      </ul>
      <Button onClick={onClear} className={classes.button}>
        Clear
      </Button>
    </Card>
  );
};

export default SearchHistory;
