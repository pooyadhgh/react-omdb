import { useState } from 'react';
import SearchHistory from '../../components/SearchHistory/SearchHistory';
import SearchResult from '../../components/SearchResult/SearchResult';
import SearchBox from '../../components/SearchBox/SearchBox';

const HomePage = () => {
  const [histories, setHistories] = useState([]);
  const [selectedResult, setSelectedResult] = useState('');

  // Save search result to history and show it
  const saveSearchHandler = item => {
    const newHistory = {
      date: Date.now(),
      ...item,
    };
    setHistories(history => [...history, newHistory]);
    setSelectedResult(item);
  };

  // Clear all histories
  const clearHistoryHandler = () => {
    setHistories([]);
  };

  const itemDeleteHandler = id => {
    const updatedHistories = histories.filter(item => item.imdbID !== id);
    setHistories(updatedHistories);
  };

  const itemClickHandler = item => {
    setSelectedResult(item);
  };

  return (
    <>
      <SearchBox onSearchItemClick={saveSearchHandler} />

      {histories.length > 0 && (
        <SearchHistory
          histories={histories}
          onClear={clearHistoryHandler}
          onClickItem={itemClickHandler}
          onDeleteItem={itemDeleteHandler}
        />
      )}

      {selectedResult.length !== 0 && <SearchResult item={selectedResult} />}
    </>
  );
};

export default HomePage;
