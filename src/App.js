import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import About from './pages/About/About';
import HomePage from './pages/HomePage/HomePage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Route path="/" component={HomePage} exact />
        <Route path="/about" component={About} />
      </Layout>
    </Router>
  );
};

export default App;
