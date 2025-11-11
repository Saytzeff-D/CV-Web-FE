import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from '../assets/icon.png'

const Navbar = () => {   
    const avatar = sessionStorage.getItem('avatar') 
    const [menuOpen, setMenuOpen] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const route = null

    const logout = ()=>{
        sessionStorage.getItem('route') == '/admin/dashboard' ? navigate('/admin/login') : navigate('/login')
        sessionStorage.removeItem('userToken')
        sessionStorage.removeItem('route')
        sessionStorage.removeItem('avatar')
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-white fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} className="img-fluid px-lg-1 px-3" width={'65px'} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setMenuOpen(true)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                    <li className="nav-item ps-md-5 pe-md-3 d-lg-block d-none">
                        <select defaultValue={"NGN"} className="form-control form-select border-0 rounded-3 text-theme">
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
                            <li><Link className="dropdown-item" to="/buy/land">Land for sale</Link></li>
                            <li><Link className="dropdown-item" to="/buy/house">House for sale</Link></li>                            
                            <li><Link className="dropdown-item" to="/buy/hostel">Hostels for sale</Link></li>
                            <li><Link className="dropdown-item" to="/buy/all">All properties for sale</Link></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <Link className={`nav-link dropdown-toggle ${pathname.startsWith("/rent") ? "active-link" : ""}`} to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Rent
                        </Link>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/rent/land">Land for rent</Link></li>
                            <li><Link className="dropdown-item" to="/rent/house">House for rent</Link></li>                            
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
                            <li><Link className="dropdown-item" to={route}>Dashboard</Link></li>
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