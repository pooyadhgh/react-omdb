import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './SearchResult.module.css';

const SearchResult = ({ item }) => {
  return (
    <Card>
      <h2>Search result</h2>
      <section className={classes.info}>
        {item.Poster !== 'N/A' && <img src={item.Poster} alt={item.Title} />}
        <section className={classes['item__info']}>
          <h3>{item.Title}</h3>
          <ul>
            <li>
              <i className="fas fa-film"></i>
              <span>Type:</span>
              {item.Type}
            </li>
            <li>
              <i className="fas fa-history"></i>
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
