import Card from '../Card/Card';
import Button from '../Button/Button';
import formatDate from '../../utils/format-date';
import classes from './SearchHistory.module.css';

const SearchHistory = ({ histories, onClear, onDeleteItem, onClickItem }) => {
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
