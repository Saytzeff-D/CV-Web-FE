import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <div>
            <Navbar />            
            <section className="container mt-md-3 mb-5 px-md-5">
                {/* Section Title */}
                <div className="py-5">
                    <h2 className="fw-bold pt-5 fs-1">Contact <br/> <span className="gradient-text">Us</span></h2>
                    <p className="text-muted fw-semibold">
                        Give us a call or send us an email and we will get back to you as soon as possible
                    </p>
                </div>

                <div className="row align-items-center">
                    {/* Contact Info */}
                    <div className="col-md-4 mb-4">
                        <div className="text-center bg-light border p-5 mb-3"> 
                            <p>
                                <i className="fs-2 fa fa-envelope-o"></i>
                            </p>    
                            <p className="my-0">
                                Email Us
                            </p>                   
                            <a className="text-dark" href="mailto:cvproperty@gmail.com">
                                cvproperty@gmail.com
                            </a>
                        </div>
                        <div className="text-center bg-light p-5 border mb-3">
                            <p>
                                <i className="fs-2 fa fa-map-marker-alt me-3"></i>
                            </p>    
                            <p className="my-0">
                                Our Address
                            </p>                
                            <a className="my-0 text-dark" href="https://maps.app.goo.gl/yApDbuTwDdUYtAHh7" target="_blank" rel="noopener noreferrer">
                                15A, Lagos, Nigeria
                            </a>
                        </div>
                        <div className="text-center bg-light p-5 border mb-3">     
                            <p>
                                <i className="fs-2 fa fa-phone me-3"></i>
                            </p>
                            <p className="my-0">
                                Call Us
                            </p>
                            <a className="my-0 text-dark" href="tel:+2348185452077">
                                08185452077
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="col-md-8 mb-4">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31707.225546788988!2d3.3650270558503115!3d6.596708927402687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b92fed71986e3%3A0x15f231c40b992496!2sKetu%2C%20Ikeja%20105102%2C%20Lagos!5e0!3m2!1sen!2sng!4v1759411441715!5m2!1sen!2sng"
                        width="100%"
                        height={600}
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="row mt-5">
                    <div className="col-md-6 mx-auto">
                        <h4 className="mb-4 text-center fw-bold">Send a message</h4>
                        <form>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Your Name" required />
                            </div>
                            <div className="mb-3">
                                <input type="email" className="form-control" placeholder="Your Email" required />
                            </div>                            
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Subject" />
                            </div>
                            <div className="mb-3">
                                <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success px-5 w-100">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </section>
            <Footer />
        </div>
    );
};

export default Contact;
