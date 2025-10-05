import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import Buy from './pages/Buy';
import Rent from './pages/Rent';
import Shortlet from './pages/Shortlet';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/buy/:type' element={<Buy />} />        
        <Route path='/rent/:type' element={<Rent />} />        
        <Route path='/shortlet/:type' element={<Shortlet />} />        
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
