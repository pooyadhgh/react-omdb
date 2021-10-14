import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './SearchHistory.module.css';

const SearchHistory = ({ histories, onClear, onDeleteItem, onClickItem }) => {
  const formatDate = date => {
    const enteredDate = new Date(date);
    const day = ('0' + enteredDate.getDate()).slice(-2);
    const month = ('0' + (enteredDate.getMonth() + 1)).slice(-2);
    const year = enteredDate.getFullYear();
    const minutes = enteredDate.getMinutes();
    let hours = enteredDate.getHours();
    hours = hours % 12;
    hours = hours ? hours : 12;
    const ampm = hours >= 12 ? 'AM' : 'PM';

    return `${year}-${month}-${day}  ${hours}:${minutes} ${ampm}`;
  };

  return (
    <Card>
      <h2>Search history</h2>
      <section className={classes['search-history']}>
        {histories.map(history => {
          return (
            <div
              className={classes['search-history__item']}
              key={history.imdbID}
            >
              <h3
                className={classes['search-history__item__title']}
                onClick={() => onClickItem(history)}
              >
                {history.Title}
              </h3>
              <p>{formatDate(history.date)}</p>
              <button onClick={() => onDeleteItem(history.imdbID)}>x</button>
            </div>
          );
        })}
      </section>
      <Button onClick={onClear} className={classes.button}>
        Clear
      </Button>
    </Card>
  );
};

export default SearchHistory;
