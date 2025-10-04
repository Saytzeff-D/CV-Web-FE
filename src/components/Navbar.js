import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/icon.png'

const Navbar = () => {    
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-white fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={Logo} className="img-fluid px-lg-1 px-3" width={'65px'} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setMenuOpen(true)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                    <li className="nav-item ps-md-5 pe-md-3 d-lg-block d-none">
                        <select defaultValue={"NGN"} className="form-control form-select bg-theme border-0 rounded-3 text-white">
                            <option value="NGN">NGN</option>
                            <option value="1">EUR</option>
                            <option value="2">USD</option>
                            <option value="3">GBP</option>
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
                            <li><Link className="dropdown-item" to="#">Land for sale</Link></li>
                            <li><Link className="dropdown-item" to="#">House for sale</Link></li>                            
                            <li><Link className="dropdown-item" to="#">Hostels for sale</Link></li>
                            <li><Link className="dropdown-item" to="#">All properties for sale</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <Link className={`nav-link dropdown-toggle ${pathname.startsWith("/rent") ? "active-link" : ""}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Rent
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="#">Land for rent</Link></li>
                            <li><Link className="dropdown-item" to="#">House for rent</Link></li>                            
                            <li><Link className="dropdown-item" to="#">Hostels for rent</Link></li>
                            <li><Link className="dropdown-item" to="#">All properties for rent</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <Link className={`nav-link dropdown-toggle ${pathname.startsWith("/shortlet") ? "active-link" : ""}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Shortlet
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="#">Shortlet in Oyo</Link></li>
                            <li><Link className="dropdown-item" to="#">Shortlet in Abuja</Link></li>                            
                            <li><Link className="dropdown-item" to="#">Shortlet in Lagos</Link></li>
                            <li><Link className="dropdown-item" to="#">All Shortlet</Link></li>
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
                <div className="d-flex" role="search">
                    <button className="btn btn-light me-2" type="submit">Sign Up</button>
                    <button className="btn bg-theme me-2" type="submit">Login</button>
                </div>
                </div>
            </div>
        </nav>        
    </div>
  );
};
export default Navbar;