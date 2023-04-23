import logo from './logo.svg';
import './App.css';
import Landing from './components/Landing.js'
import Layout from './components/Layout.js'
import Movies from './components/Movies.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from 'reactstrap';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path='movies' element={<Movies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;