import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing.js'
import Layout from './components/Layout.js'
import MoviesSearch from './components/MoviesSearch.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path='movies' element={<MoviesSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;