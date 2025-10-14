import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Logo from "../assets/icon.png"
import AboutImg from "../assets/about.png"
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Navbar />
            <div className="my-5 py-md-5 py-4 px-4">
                <div className="row w-100">
                    <div className="col-md-8">
                        <p className="gradient-text fw-semibold display-1 py-md-5 about-text">
                            What Make Us Unique
                        </p> 
                    </div>
                    <div className="col-4 d-md-block d-none">
                        <img src={Logo} className="img-fluid" alt="Logo" />
                    </div>
                </div>
                <p className="gradient-text fw-semibold fs-4">
                    Our vision
                </p>
                <p className="py-1 col-md-7 fs-6">
                    We’ve always tried to take our own path with C & V Real Estate Mangement. Over the years, we’ve set ourselves apart in a few ways that we’re proud of.
                </p>
                {/* Brief and Mission */}
                <div className="row w-100">
                    <div className="col-md-6">
                        <img src={AboutImg} className="img-fluid" alt="About" />
                    </div>
                    <div className="col-md-6">
                        <p className="gradient-text fw-semibold fs-4">
                            Brief
                        </p>
                        <p className="py-1 fs-6">
                            At C&V Real Estate Management, we are dedicated to providing exceptional property management services that prioritize client satisfaction and operational excellence. With years of industry experience, our team understands the unique challenges and opportunities within the real estate market
                        </p>
                        <p className="gradient-text fw-semibold fs-4">
                            Our Mission
                        </p>
                        <p className="py-1 fs-6">
                             Our mission is to enhance the value of your property while ensuring a seamless experience for both property owners and tenants. We offer a comprehensive range of services, including property leasing, tenant screening, maintenance coordination, and financial reporting. Our proactive approach and attention to detail allow us to maximize the return on investment for property owners while fostering positive relationships with tenants..
                        </p>
                    </div>
                </div>
                {/* Sales Renting and Leasing */}
                <div className="d-flex flex-md-row flex-column my-5">
                    <div className="me-md-3 mb-4">
                        <p className="fw-bold fs-5">
                            Sales
                        </p>
                        <p className="fs-6">
                            For buyers, our team of experienced agents works tirelessly to match you with the perfect property that meets your needs and budget.
                        </p>
                    </div>
                    <div className="me-md-3 mb-4">
                        <p className="fw-bold fs-5">
                            Rentings
                        </p>
                        <p className="fs-6">
                            If you’re in the market for a rental property, we offer a wide range of options tailored to fit every lifestyle. From urban apartments
                        </p>
                    </div>
                    <div className="me-md-3 mb-4">
                        <p className="fw-bold fs-5">
                            Leasing
                        </p>
                        <p className="fs-6">
                            For those seeking flexible leasing options, we provide both short-term and long-term leasing solutions for properties
                        </p>
                    </div>
                </div>
                {/* That's all */}
                <div className="row w-100 my-2">
                    <div className="col-md-6">
                        <p className="gradient-text fw-semibold fs-1 text-center">
                            That’s all about C & V <br /> Real Estate Management!
                        </p>
                    </div>
                    <div className="col-md-6 p-4">
                        <p className="fs-6">
                            We are excited about the opportunity to learn about your business and how we can help you achieve your goals when looking for your ideal property
                        </p>
                        <button onClick={()=>navigate('/contact')} className="btn gradient-text py-3 border rounded-0">
                            Get in touch with us
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
