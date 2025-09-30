import React from "react";
import { Link } from "react-router-dom";
import Logo from '../assets/icon.png'

const Footer = ()=>{
    return (
        <div className="bg-footer text-white">
            <div className="container pt-5">
                <div className="d-flex">
                    <div>
                        <img src={Logo} className="img-fluid" width={'65px'} />
                    </div>
                    <div className="ms-3 pt-2">
                        <p className="text-small fw-semibold">
                            Chuks & Vin <br/> Real Estate Management
                        </p>
                    </div>
                </div>
                <div className="row mt-4 pb-5">
                    <div className="col-md-6 mb-4">
                        <div className="col-md-6">
                            <p className="small">
                                CV property incorporates proven, professional state of-the-art techniques
                            </p>
                            <hr />
                            <div className="d-flex gap-4">
                                <Link to="#"><i className="fa fa-whatsapp fa-lg text-dark"></i></Link>
                                <Link to="#"><i className="fa fa-instagram fa-lg text-dark"></i></Link>
                                <Link to="#"><i className="fa fa-facebook fa-lg text-dark"></i></Link>
                                <Link to="#"><i className="fa fa-linkedin fa-lg text-dark"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <div className="row pb-5">
                            <div className="col-md-4 col-6">
                                <p className="fw-bold">Useful Links</p>
                                <ul className="list-unstyled">
                                    <li><Link to="#" className="text-muted text-decoration-none">About</Link></li>
                                    <li><Link to="#" className="text-muted text-decoration-none">Properties</Link></li>
                                    <li><Link to="#" className="text-muted text-decoration-none">Blog</Link></li>
                                    <li><Link to="#" className="text-muted text-decoration-none">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-4 col-6">
                                <p className="fw-bold">Category</p>
                                <ul className="list-unstyled">
                                    <li><Link to="#" className="text-muted text-decoration-none">Land</Link></li>
                                    <li><Link to="#" className="text-muted text-decoration-none">Apartment</Link></li>
                                    <li><Link to="#" className="text-muted text-decoration-none">Hostels</Link></li>
                                    <li><Link to="#" className="text-muted text-decoration-none">Houses</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-4">
                                <p className="fw-bold">Contact</p>
                                <ul className="list-unstyled">
                                    <li><Link to="#" className="text-muted text-decoration-none">15A, Lagos Nigeria</Link></li>
                                    <li><Link to="tel:08114590077" className="text-muted text-decoration-none">08114590077</Link></li>
                                    <li><Link to="mailto:cvproperty@gmail.com" className="text-muted text-decoration-none">cvproperty@gmail.com</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer