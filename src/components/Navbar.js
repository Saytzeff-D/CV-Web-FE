import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/icon.png'

const Navbar = () => {
    const location = useLocation
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light fixed-top-md">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src={Logo} className="img-fluid p-2" width={'65px'} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                    <li className="nav-item ps-md-5 pe-md-3">
                        <select className="form-control form-select bg-theme border-0 rounded-3 text-white">
                            <option selected value="NGN">NGN</option>
                            <option value="1">EUR</option>
                            <option value="2">USD</option>
                            <option value="3">GBP</option>
                        </select>
                    </li>
                    <li className="nav-item px-md-3">
                        <a className="nav-link active" aria-current="page" href="#">
                            Home
                        </a>
                    </li>
                    <li className="nav-item px-md-3">
                        <a className="nav-link" href="#">
                            About
                        </a>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Buy
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Rent
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3 dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Shortlet
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </li>
                    <li className="nav-item px-md-3">
                        <a className="nav-link">
                            Blog
                        </a>
                    </li>
                    <li className="nav-item px-md-3">
                        <a className="nav-link">
                            Contact
                        </a>
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