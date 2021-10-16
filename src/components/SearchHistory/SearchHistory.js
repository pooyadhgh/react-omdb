import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './SearchHistory.module.css';

const SearchHistory = ({ histories, onClear, onDeleteItem, onClickItem }) => {
  const formatDate = date => {
    const enteredDate = new Date(date);
    const day = enteredDate.getDate().toString().padStart(2, '0');
    const month = (enteredDate.getMonth() + 1).toString().padStart(2, '0');
    const year = enteredDate.getFullYear().toString().padStart(4, '0');
    const minutes = enteredDate.getMinutes().toString().padStart(2, '0');
    let hours = enteredDate.getHours();
    hours = hours % 12;
    hours = hours ? hours.toString().padStart(2, '0') : 12;
    const ampm = hours >= 12 ? 'AM' : 'PM';

    return `${year}-${month}-${day}, ${hours}:${minutes} ${ampm}`;
  };

  return (
    <Card>
      <h2>Search history</h2>
      <section className={classes['search-history']}>
        {histories.map((history, index) => {
          return (
            <div
              className={classes['search-history__item']}
              key={history.imdbID}
            >
              <h3
                className={classes['search-history__item__title']}
                onClick={() => onClickItem(history)}
                tabIndex={index}
                onKeyDown={event => {
                  // Handle pressing enter key
                  if (event.keyCode === 13) {
                    onClickItem(history);
                  }
                }}
              >
                <i className="fas fa-history"></i>

                {history.Title}
              </h3>
              <time>{formatDate(history.date)}</time>
              <button onClick={() => onDeleteItem(history.imdbID)}>
                <i className="fas fa-times"></i>
              </button>
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
