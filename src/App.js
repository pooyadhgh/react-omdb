import { useState } from 'react';
import Layout from './components/Layout/Layout';
import SearchResult from './components/SearchResult/SearchResult';
import SearchHistory from './components/SearchHistory/SearchHistory';
import SearchBox from './components/SearchBox/SearchBox';

const App = () => {
  const [histories, setHistories] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);

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

  // Remove an item from search histories
  const itemDeleteHandler = id => {
    const updatedHistories = histories.filter(item => item.imdbID !== id);
    setHistories(updatedHistories);
  };

  // Select an item and display in results section
  const itemClickHandler = item => {
    setSelectedResult(item);
  };

  return (
    <Layout>
      <SearchBox onSearchItemClick={saveSearchHandler} />

      {histories.length > 0 && (
        <SearchHistory
          histories={histories}
          onClear={clearHistoryHandler}
          onClickItem={itemClickHandler}
          onDeleteItem={itemDeleteHandler}
        />
      )}

      {selectedResult && <SearchResult item={selectedResult} />}
    </Layout>
  );
};

export default App;
