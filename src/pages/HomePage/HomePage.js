import { useEffect, useRef, useState } from 'react';
import api from '../../api/api';
import SearchHistory from '../../components/SearchHistory/SearchHistory';
import SearchResult from '../../components/SearchResult/SearchResult';
import useDebounce from '../../hooks/use-debounce';
import classes from './HomePage.module.css';

const HomePage = () => {
  const [value, setValue] = useState('');
  const [datalist, setDataList] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [history, setHistory] = useState([]);
  const [resultId, setResultId] = useState('');
  const debouncedKeyword = useDebounce(value, 1000);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    // Call API if entered keyword is greater than 3
    const searchHandler = async keyword => {
      if (keyword.trim().length < 3) return;
      try {
        const { data } = await api.getData({ s: keyword.trim().toLowerCase() });

        // Check if request has any results or not
        setNotFound(data.Response === 'False');

        // Save request data to state
        setDataList(data.Search);
      } catch (err) {
        console.log(err);
      }
    };

    searchHandler(debouncedKeyword);
  }, [debouncedKeyword]);

  // Input onChange handler
  const valueChangeHandler = event => {
    setValue(event.target.value);
    setDataList([]);
  };

  // Save search result to history and show it
  const saveSearchHandler = item => {
    const date = new Date();
    const newHistory = {
      date: date.toString(),
      item: item,
    };

    setHistory(history => [...history, newHistory]);
    setResultId(item.imdbID);

    setDataList([]);
    setValue('');
  };

  // Clear all histories
  const clearHistoryHandler = () => {
    setHistory([]);
  };

  return (
    <>
      <form className={classes['form-control']}>
        <label className={classes['form-control__label']}>
          Enter a keyword
        </label>
        <input
          ref={inputRef}
          className={`${classes['form-control__input']} ${
            notFound && classes['form-control__input__invalid']
          }`}
          type="text"
          id="keyword"
          name="keyword"
          value={value}
          onChange={valueChangeHandler}
          placeholder="Movie or series name..."
        />
        {datalist && datalist.length > 0 && (
          <ul id="data-list" className={classes['form-control__list']}>
            {datalist.map(item => {
              return (
                <li
                  key={item.Title}
                  value={item.Title}
                  onClick={() => saveSearchHandler(item)}
                >
                  {item.Poster !== 'N/A' && (
                    <img src={item.Poster} alt={item.Title} />
                  )}
                  {item.Title}
                </li>
              );
            })}
          </ul>
        )}

        {notFound && (
          <p className={classes.error}>
            No results found. Please try another keyword.
          </p>
        )}
      </form>

      {history.length > 0 && (
        <SearchHistory histories={history} clearHistory={clearHistoryHandler} />
      )}
      {resultId.length !== 0 && <SearchResult resultId={resultId} />}
    </>
  );
};

export default HomePage;
