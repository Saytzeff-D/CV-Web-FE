import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { contactSchema } from "../../../schemas";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

const Contact = () => {
    const uri = useSelector(state=>state.UriReducer.uri)
    const [isLoading, setIsLoading] = React.useState(false);
    const [successMessage, setSuccessMessage] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');

    const {handleBlur, handleChange, handleSubmit, values, touched, errors} = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validationSchema: contactSchema,
        onSubmit: (values, { resetForm }) => {
            setIsLoading(true);
            axios.post(`${uri}contact/create`, values)
            .then((res)=>{
                setIsLoading(false);
                setSuccessMessage(res.data.message);
                setErrorMessage('');
                resetForm();
                console.log(res.data.message);
            })
            .catch((err)=>{
                setIsLoading(false);
                setErrorMessage(err.response?.data?.message || "Failed to send message. Please try again.");
                setSuccessMessage('');
                console.log(err);
                console.log(err.response?.data?.message || "Failed to send message. Please try again.");
            })
        }
    })
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
                    <div className="col-lg-4 col-md-5 mb-4">
                        <div className="text-center bg-light border p-5 mb-3"> 
                            <p>
                                <i className="fs-2 fa fa-envelope-o"></i>
                            </p>    
                            <p className="my-0">
                                Email Us
                            </p>                   
                            <a className="text-dark text-break" href="mailto:candvproperty@gmail.com">
                                candvproperty@gmail.com
                            </a>
                        </div>
                        <div className="text-center bg-light p-5 border mb-3">
                            <p>
                                <i className="fs-2 fa fa-map-marker-alt me-3"></i>
                            </p>    
                            <p className="my-0">
                                Our Address
                            </p>                
                            <a className="my-0 text-dark" href="https://maps.app.goo.gl/FQoyGu2wm9EiVTtXA" target="_blank" rel="noopener noreferrer">
                                Block A, Facebook Complex, Under G Road, Ogbomoso, Oyo State
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
                    <div className="col-lg-8 col-md-7 mb-4">                    
                    <iframe 
                        className="w-100"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.4032778835667!2d4.2629811750089734!3d8.162061691868658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10370daf3fc49367%3A0xb7eea39b9bbe7be3!2sFacebook%20complex!5e0!3m2!1sen!2sng!4v1763461293494!5m2!1sen!2sng"                         
                        height="650" 
                        style={{border:0}} 
                        allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="row mt-5">
                    <div className="col-md-6 mx-auto">
                        <h4 className="mb-4 text-center fw-bold">Send a message</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input value={values.name} type="text" name="name" onBlur={handleBlur} onChange={handleChange} className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} placeholder="Your Name" required />
                            </div>
                            <div className="mb-3">
                                <input value={values.email} type="email" name="email" onBlur={handleBlur} onChange={handleChange} className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} placeholder="Your Email" required />
                            </div>                            
                            <div className="mb-3">
                                <input value={values.subject} type="text" name="subject" onBlur={handleBlur} onChange={handleChange} className={`form-control ${errors.subject && touched.subject ? 'is-invalid' : ''}`} placeholder="Subject" required />
                            </div>
                            <div className="mb-3">
                                <textarea value={values.message} name="message" onBlur={handleBlur} onChange={handleChange} className={`form-control ${errors.message && touched.message ? 'is-invalid' : ''}`} rows="5" placeholder="Message" required></textarea>
                            </div>
                            <div className="text-center">
                                <button disabled={isLoading} type="submit" className="btn btn-success px-5 w-100">
                                    {isLoading ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </section>

                <Snackbar
                    open={!!successMessage || !!errorMessage}
                    autoHideDuration={6000}
                    onClose={() => {
                        setSuccessMessage('');
                        setErrorMessage('');
                    }}
                    message={successMessage || errorMessage}
                >
                    <Alert variant="filled" severity={successMessage ? "success" : "error"}>
                        {successMessage || errorMessage}
                    </Alert>
                </Snackbar>
            <Footer />
        </div>
    );
};

export default Contact;
