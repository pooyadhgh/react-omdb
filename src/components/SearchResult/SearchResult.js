import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './SearchResult.module.css';

const SearchResult = ({ item }) => {
  return (
    <Card>
      <h2>Search result</h2>
      <section className={classes['result-info']}>
        <figure>
          <img
            src={
              item.Poster !== 'N/A'
                ? item.Poster
                : `https://via.placeholder.com/300x400.png?text=${item.Title}`
            }
            alt={item.Title}
            title={item.Title}
          />
        </figure>

        <section className={classes['result-info__item']}>
          <h3>{item.Title}</h3>
          <ul>
            <li>
              <i className="fas fa-film"></i>
              <span>Type:</span>
              {item.Type}
            </li>
            <li>
              <i className="far fa-calendar-alt"></i>
              <span>Year:</span>
              {item.Year}
            </li>
            <li>
              <i className="fab fa-imdb"></i>
              <span>IMDB ID:</span>
              {item.imdbID}
            </li>
          </ul>
        </section>
      </section>
      <Button
        className={classes.button}
        href={`https://www.imdb.com/title/${item.imdbID}`}
      >
        Detail
      </Button>
    </Card>
  );
};

export default SearchResult;
