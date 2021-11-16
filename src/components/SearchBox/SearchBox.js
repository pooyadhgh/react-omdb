import { useEffect, useRef, useReducer } from 'react';
import api from '../../api/api';
import useDebounce from '../../hooks/use-debounce';
import Loading from '../Loading/Loading';
import classes from './SearchBox.module.css';

const VALUE_ONCHANGE = 'VALUE_ONCHANGE';
const SEARCH_REQUEST = 'SEARCH_REQUEST';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_FAILED = 'SEARCH_FAILED';
const SEARCH_NOTFOUND = 'SEARCH_NOTFOUND';
const TOGGLE_SHOW_RESULTS = 'TOGGLE_SHOW_RESULTS';
const SET_ACC = 'SET_ACC';
const RESET_RESULTS = 'RESET_RESULTS';
const RESET_VALUE = 'RESET_VALUE';

const initialState = {
  value: '',
  searchResults: [],
  notFound: false,
  loading: false,
  error: null,
  showResults: true,
  acc: -1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case VALUE_ONCHANGE:
      return {
        ...state,
        showResults: true,
        error: null,
        value: action.payload,
        acc: -1,
      };
    case SEARCH_REQUEST:
      return { ...state, loading: true };
    case SEARCH_SUCCESS:
      return {
        ...state,
        notFound: false,
        loading: false,
        error: null,
        searchResults: action.payload,
      };
    case SEARCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEARCH_NOTFOUND:
      return { ...state, loading: false, notFound: true };
    case TOGGLE_SHOW_RESULTS:
      return { ...state, showResults: action.payload };
    case SET_ACC:
      return { ...state, acc: action.payload };
    case RESET_RESULTS:
      return { ...state, searchResults: [], notFound: false };
    case RESET_VALUE:
      return { ...state, value: '' };

    default:
      return state;
  }
};

const SearchBox = ({ onSearchItemClick }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();
  const debouncedKeyword = useDebounce(state.value, 800);
  const listRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    listRef?.current?.children[state.acc]?.focus();

    // Call API if entered keyword is more than 3 words
    const searchHandler = async keyword => {
      if (keyword.trim().length < 3) return;
      dispatch({ type: SEARCH_REQUEST });
      try {
        const { data } = await api.getData({
          s: keyword.trim(),
        });

        // Check if request has any results or not
        if (data.Response === 'False') {
          dispatch({ type: SEARCH_NOTFOUND });
          return;
        }

        // Save request data to state
        dispatch({ type: SEARCH_SUCCESS, payload: data.Search });
      } catch (error) {
        dispatch({ type: SEARCH_FAILED, payload: error });
      }
    };

    searchHandler(debouncedKeyword);
  }, [debouncedKeyword, state.acc]);

  // Input onChange handler
  const valueChangeHandler = event => {
    dispatch({ type: VALUE_ONCHANGE, payload: event.target.value.toString() });
    dispatch({ type: RESET_RESULTS });
  };

  const searchItemClickHandler = item => {
    // Get function from props
    onSearchItemClick(item);

    dispatch({ type: RESET_RESULTS });
    dispatch({ type: RESET_VALUE });
  };

  const toggleResultsHandler = isShowResult => {
    dispatch({ type: TOGGLE_SHOW_RESULTS, payload: isShowResult });
  };

  // Handle keydown and keyup
  const keyDownHandler = event => {
    if (event.keyCode === 38 && state.acc < 0) return;
    if (event.keyCode === 40 && state.acc >= state.searchResults.length) {
      dispatch({ type: SET_ACC, payload: 0 });
      return;
    }

    if (event.keyCode === 40) {
      dispatch({ type: SET_ACC, payload: ++state.acc });
    } else if (event.keyCode === 38) {
      dispatch({ type: SET_ACC, payload: --state.acc });
    }
  };

  return (
    <>
      <form
        className={classes['form-control']}
        onSubmit={event => event.preventDefault()}
        onKeyDown={keyDownHandler}
      >
        <label htmlFor="keyword" className={classes['form-control__label']}>
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
            if (event.keyCode === 27) {
              toggleResultsHandler(false);
            }
          }}
          onFocus={() => {
            toggleResultsHandler(true);
          }}
          required
          minLength="3"
        />
        <span
          className={`fas fa-search ${classes['form-control__input__icon']}`}
        ></span>

        {state.showResults && state.searchResults.length > 0 && (
          <div className={classes['form-control__list']}>
            <div className={classes['form-control__list__suggestion']}>
              Suggestions:
              <button tabIndex={1} onClick={() => toggleResultsHandler(false)}>
                <i className="fas fa-times"></i>
                Clear
              </button>
            </div>
            <ul ref={listRef}>
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
                    {item.Title}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div className={classes['form-control__input__feedback']}>
          {state.loading && <Loading />}

          {state.value.trim().length > 0 && state.value.trim().length < 3 && (
            <p className={classes.warning}>
              Please enter at least 3 characters to start searching ...
            </p>
          )}

          {state.error && (
            <p className={classes.error}>
              Something went wrong: {state.error.message}
            </p>
          )}

          {state.notFound && (
            <p className={classes.error}>
              No results found. Please try another keyword.
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default SearchBox;
