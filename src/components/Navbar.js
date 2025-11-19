import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from '../assets/icon.png'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Navbar = () => {   
    const avatar = sessionStorage.getItem('avatar') 
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const myRoute = sessionStorage.getItem('route')
    const dispatch = useDispatch()
    const currency = useSelector(state=>state.CurrencyReducer.currency);

    // useEffect(()=>{
    //     axios.get('https://api.exchangerate.host/latest?base=NGN&symbols=USD,GBP,EUR').then(res=>{
    //         console.log("Exchange rates:", res.data);
    //         dispatch({type: 'SET_EXCHANGE_RATES', payload: res.data.rates})
    //     }).catch(err=>{
    //         console.log(err);
    //     })
    // })

    const logout = ()=>{
        sessionStorage.getItem('route') == '/admin/dashboard' ? navigate('/admin/login') : navigate('/login')
        sessionStorage.removeItem('userToken')
        sessionStorage.removeItem('route')
        sessionStorage.removeItem('avatar')
    }

    const handleCurrency = (value) => {        
        dispatch({type: 'SET_CURRENCY', payload: value});
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-white fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} className="img-fluid px-lg-1 px-3" width={'65px'} />
                </Link>
                <div className="d-lg-none px-3 mb-2">
                    <select onChange={(e)=> handleCurrency(e.target.value)} defaultValue={currency} className="form-control form-select rounded-3 text-theme">
                        <option value="NGN">NGN</option>
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setMenuOpen(true)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                    <li className="nav-item ps-md-5 pe-md-3 d-lg-block d-none">
                        <select onChange={(e)=> handleCurrency(e.target.value)} defaultValue={currency} className="form-control form-select border-0 rounded-3 text-theme">
                            <option value="NGN">NGN</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </li>
                    <li className="nav-item px-md-3">
                        <Link className={`nav-link ${pathname === "/" ? "active-link" : ""}`} aria-current="page" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item px-md-3">
                        <Link className={`nav-link ${pathname === "/about" ? "active-link" : ""}`} to="/about">
                            About
                        </Link>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <Link className={`nav-link dropdown-toggle ${pathname.startsWith("/buy") ? "active-link" : ""}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Buy
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/buy/land">Land for sale</Link></li>
                            <li><Link className="dropdown-item" to="/buy/house">Apartments for sale</Link></li>                            
                            <li><Link className="dropdown-item" to="/buy/hostel">Hostels for sale</Link></li>
                            <li><Link className="dropdown-item" to="/buy/all">All properties for sale</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <Link className={`nav-link dropdown-toggle ${pathname.startsWith("/rent") ? "active-link" : ""}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Rent
                        </Link>
                        <ul className="dropdown-menu">                            
                            <li><Link className="dropdown-item" to="/rent/house">Apartments for rent</Link></li>                            
                            <li><Link className="dropdown-item" to="/rent/hostel">Hostels for rent</Link></li>
                            <li><Link className="dropdown-item" to="/rent/all">All properties for rent</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <Link className={`nav-link dropdown-toggle ${pathname.startsWith("/shortlet") ? "active-link" : ""}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Shortlet
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/shortlet/oyo">Shortlet in Oyo</Link></li>
                            <li><Link className="dropdown-item" to="/shortlet/abuja">Shortlet in Abuja</Link></li>                            
                            <li><Link className="dropdown-item" to="/shortlet/lagos">Shortlet in Lagos</Link></li>
                            <li><Link className="dropdown-item" to="/shortlet/all">All Shortlet</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3">
                        <Link className={`nav-link ${pathname === "/blog" ? "active-link" : ""}`} to={'/blog'}>
                            Blog
                        </Link>
                    </li>
                    <li className="nav-item px-md-3">
                        <Link className={`nav-link ${pathname === "/contact" ? "active-link" : ""}`} to={'/contact'}>
                            Contact
                        </Link>
                    </li>
                </ul>
                {
                    avatar !== null && avatar !== undefined
                    ?
                    <div className="dropdown" role="search">
                        <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" style={{cursor: 'pointer'}}>
                            <img src={avatar} alt="User Avatar" className="rounded-circle" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                        </div>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <p className="dropdown-item cursor-pointer my-0" onClick={()=> myRoute.includes('client') ? navigate('/client/dashboard') : myRoute.includes('agent') ? navigate('/agent/dashboard') : navigate('/admin/dashboard')} >
                                    Dashboard
                                </p>
                            </li>
                            <li><p className="dropdown-item cursor-pointer" onClick={logout} >Logout</p></li>
                        </ul>
                    </div>
                    :
                    <div className="d-flex" role="search">
                        <button onClick={()=>navigate('/create-account')} className="btn btn-white me-2" type="submit">Sign Up</button>
                        <button onClick={()=>navigate('/login')} className="btn bg-theme me-2" type="submit">Login</button>
                    </div>
                }
                </div>
            </div>
        </nav>        
    </div>
  );
};
export default Navbar;