import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const NotFound = () => {
    return (
        <div>
            <Navbar />
            <div className="container my-5 py-5">
                <div className="col-md-8 border-end">
                    <h1 className="fw-bold fs-1 mt-md-5 mt-2">404 - Page Not Found</h1>
                    <p className="text-muted">
                        The page you requested could not be found. Try refining your search, or use the navigation above to locate the post.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default NotFound;