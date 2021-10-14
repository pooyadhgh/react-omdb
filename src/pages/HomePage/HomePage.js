import { useState } from 'react';
import SearchHistory from '../../components/SearchHistory/SearchHistory';
import SearchResult from '../../components/SearchResult/SearchResult';
import SearchBox from '../../components/SearchBox/SearchBox';

const HomePage = () => {
  const [histories, setHistories] = useState([]);
  const [selectedResult, setSelectedResult] = useState('');

  // Save search result to history and show it
  const saveSearchHandler = item => {
    const date = new Date();
    const newHistory = {
      date: date.toString(),
      item: item,
    };

    setHistories(history => [...history, newHistory]);
    setSelectedResult(item.imdbID);
  };

  // Clear all histories
  const clearHistoryHandler = () => {
    setHistories([]);
  };

  return (
    <>
      <SearchBox onSearchItemClick={saveSearchHandler} />

      {histories.length > 0 && (
        <SearchHistory histories={histories} onClear={clearHistoryHandler} />
      )}

      {selectedResult.length !== 0 && <SearchResult item={selectedResult} />}
    </>
  );
};

export default HomePage;
