import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/user/main/Home';
import About from './pages/user/main/About';
import Contact from './pages/user/main/Contact';
import NotFound from './pages/NotFound';
import Blog from './pages/user/main/Blog';
import Buy from './pages/user/main/Buy';
import Rent from './pages/user/main/Rent';
import Shortlet from './pages/user/main/Shortlet';
import ApartmentDetails from './pages/user/main/ApartmentDetails';
import LandDetails from './pages/user/main/LandDetails';
import CreateAccount from './pages/user/auth/CreateAccount';
import Login from './pages/user/auth/Login';
import VerifyEmail from './pages/user/auth/VerifyEmail';
import ForgotPassword from './pages/user/auth/ForgotPassword';
import ResetPassword from './pages/user/auth/ResetPassword';
import AdminDashboard from './pages/admin/dashboard';

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
        <Route path='/apartment/:type/:id' element={<ApartmentDetails />} />
        <Route path='/land/:type/:id' element={<LandDetails />} />  
        <Route path='/create-account' element={<CreateAccount />} />  
        <Route path='/create-account/verify' element={<VerifyEmail />} /> 
        <Route path='/login' element={<Login />} />    
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
