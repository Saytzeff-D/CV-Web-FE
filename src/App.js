import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Blog from './pages/Blog';
import CreateAccount from './pages/user/auth/CreateAccount';
import Login from './pages/user/auth/Login';
import VerifyEmail from './pages/user/auth/VerifyEmail';
import ForgotPassword from './pages/user/auth/ForgotPassword';
import ResetPassword from './pages/user/auth/ResetPassword';
import FilterBar from './components/Filterbar';
import GoogleAuth from './GoogleAuth';
import PayNow from './pages/PayNow';
import TransactionStatus from './pages/TransactionStatus';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/user/dashboard/Booking';
import HeroSection from './pages/user/dashboard/HeroSection';
import EditProfile from './pages/user/dashboard/Profile';
import MyFavoritesPage from './pages/user/dashboard/MyFavoritesPage';
import TransactionHistory from './pages/user/dashboard/TransactionHistory';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ServerDown from './pages/ServerDown';
import PropertyCatalogMain from './pages/properties/catalog/PropertyCatalogMain';
import PropertyDetailsMain from './pages/properties/details/PropertyDetailsMain';

// GLOBAL INTERCEPTOR FOR DIRECT AXIOS CALLS
axios.interceptors.response.use(
(response) => {
  return response;
},
(error) => {
  if (error.response) {
    const status = error.response.status;

    // Catch Rate Limiting (429) or Server Crashes (503/500)
    if (status === 429 || status === 503) {
      sessionStorage.setItem("lastAttemptedPath", window.location.pathname);
      console.warn("Server rate limit or downtime caught globally.");
      
      // Use window.location to force an immediate escape from the blank screen
      window.location.href = "/server-down"; 
    }
  }
  return Promise.reject(error);
}
);
function App() {
  const uri = useSelector(state=>state.UriReducer.uri)
  const dispatch = useDispatch()
  const theme = createTheme({
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
  });
  useEffect(()=>{
    axios.post(`${uri}payment/update-rates`).then((res)=>{
      let { usd, gbp, eur } = res.data.data
      dispatch({type: 'SET_EXCHANGE_RATE', payload: { NGN: 1, USD: usd, GBP: gbp, EUR: eur}})      
    }).catch((err)=>{
      console.log("Error updating currency rates");
    })
  }, [])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/properties' element={<PropertyCatalogMain />} />
        <Route path='/property/:id' element={<PropertyDetailsMain />} />        
        <Route path='/create-account' element={<CreateAccount />} />  
        <Route path='/create-account/verify' element={<VerifyEmail />} /> 
        <Route path='/login' element={<Login />} />    
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/contact' element={<Contact />} />        
        <Route path='/filterbar' element={<FilterBar />} />
        <Route path='/pay-now' element={<PayNow />} />
        <Route path='/payment/verify/' element={<TransactionStatus />} />
        <Route path='/google-auth' element={<GoogleAuth />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/terms-of-service' element={<TermsOfService />} />
        <Route path='/refund-policy' element={<RefundPolicy />} />
        <Route path='/user' element={<Dashboard />}>
          <Route path='/user/' element={<HeroSection />} />
          <Route path='/user/bookings' element={<Bookings />} />
          <Route path='/user/saved-searches' element={<MyFavoritesPage />} />
          <Route path='/user/profile' element={<EditProfile />} />
          <Route path='/user/transactions' element={<TransactionHistory />} />
        </Route>        
        <Route path='*' element={<NotFound />} />
        <Route path='/server-down' element={<ServerDown />} />
      </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
