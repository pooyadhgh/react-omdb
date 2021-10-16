import { useEffect, useRef, useReducer } from 'react';
import api from '../../api/api';
import useDebounce from '../../hooks/use-debounce';
import Loading from '../Loading/Loading';
import classes from './SearchBox.module.css';

const initialState = {
  value: '',
  searchResults: [],
  notFound: false,
  loading: false,
  error: '',
  showResults: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'VALUE_ONCHANGE':
      return { ...state, showResults: true, value: action.payload };
    case 'SEARCH_REQUEST':
      return { ...state, loading: true };
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        notFound: false,
        loading: false,
        error: '',
        searchResults: action.payload,
      };
    case 'SEARCH_FAILED':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'SEARCH_NOTFOUND':
      return { ...state, loading: false, notFound: true };
    case 'TOGGLE_SHOW_RESULTS':
      return { ...state, showResults: action.payload };
    case 'RESET_RESULTS':
      return { ...state, searchResults: [], notFound: false };
    case 'RESET_VALUE':
      return { ...state, value: '' };

    default:
      return state;
  }
};

const SearchBox = ({ onSearchItemClick }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();
  const debouncedKeyword = useDebounce(state.value, 800);

  useEffect(() => {
    inputRef.current.focus();

    // Call API if entered keyword is greater than 3 words
    const searchHandler = async keyword => {
      if (keyword.trim().length < 3) return;
      dispatch({ type: 'SEARCH_REQUEST' });
      try {
        const { data } = await api.getData({ s: keyword.trim().toLowerCase() });

        // Check if request has any results or not
        if (data.Response === 'False') {
          dispatch({ type: 'SEARCH_NOTFOUND' });
          return;
        }

        // Save request data to state
        dispatch({ type: 'SEARCH_SUCCESS', payload: data.Search });
      } catch (error) {
        dispatch({ type: 'SEARCH_FAILED', payload: error });
      }
    };

    searchHandler(debouncedKeyword);
  }, [debouncedKeyword]);

  // Input onChange handler
  const valueChangeHandler = event => {
    dispatch({ type: 'VALUE_ONCHANGE', payload: event.target.value });
    dispatch({ type: 'RESET_RESULTS' });
  };

  const searchItemClickHandler = item => {
    // Get function from props
    onSearchItemClick(item);

    dispatch({ type: 'RESET_RESULTS' });
    dispatch({ type: 'RESET_VALUE' });
  };

  const toggleResultsHandler = isShowResult => {
    dispatch({ type: 'TOGGLE_SHOW_RESULTS', payload: isShowResult });
  };

  return (
    <>
      <form
        className={classes['form-control']}
        onSubmit={event => event.preventDefault()}
      >
        <label className={classes['form-control__label']}>
          Enter a keyword
        </label>

        <input
          ref={inputRef}
          className={`${classes['form-control__input']} ${
            state.notFound && classes['form-control__input__invalid']
          }`}
          type="text"
          id="keyword"
          name="keyword"
          placeholder="Movie or series name..."
          value={state.value}
          onChange={valueChangeHandler}
          onKeyDown={event => {
            // Handle pressing escape key
            if (event.keyCode === 27) {
              toggleResultsHandler(false);
            }
          }}
          onFocus={() => {
            toggleResultsHandler(true);
          }}
        />
        <i
          className={`fas fa-search ${classes['form-control__input__icon']}`}
        ></i>

        {state.loading && <Loading />}

        {state.showResults && state.searchResults.length > 0 && (
          <section className={classes['form-control__list']}>
            <div className={classes['form-control__list__suggestion']}>
              Suggestions:
              <button tabIndex={1} onClick={() => toggleResultsHandler(false)}>
                <i className="fas fa-times"></i>
                Clear
              </button>
            </div>
            <ul>
              {state.searchResults.map((item, index) => {
                return (
                  <li
                    tabIndex={index + 2}
                    key={index}
                    value={item.Title}
                    onClick={() => searchItemClickHandler(item)}
                    onKeyDown={event => {
                      // Handle pressing enter key
                      if (event.keyCode === 13) {
                        searchItemClickHandler(item);
                      }
                      if (event.keyCode === 27) {
                        toggleResultsHandler(false);
                      }
                    }}
                  >
                    {item.Poster !== 'N/A' && (
                      <figure>
                        <img src={item.Poster} alt={item.Title} />{' '}
                      </figure>
                    )}
                    {item.Title}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {state.error && (
          <p className={classes.error}>
            Something went wrong. Please try again.
          </p>
        )}

        {state.notFound && (
          <p className={classes.error}>
            No results found. Please try another keyword.
          </p>
        )}
      </form>
    </>
  );
};

export default SearchBox;
