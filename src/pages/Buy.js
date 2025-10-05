import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Buy = () => {
    const properties = [1,2,3,4, 5,6,7,8,9,10,11,12]
    return (
        <>
        <Navbar />
        <div className="container my-5 py-4">
            <hr className="text-theme fw-bold" />
            <p className="fw-semibold">
                Home / <span className="text-theme">Buy</span>
            </p>
            <div
                className="d-flex flex-wrap gap-2 align-items-center mb-4 overflow-auto p-2"
                style={{ whiteSpace: "nowrap" }}
            >
                <div className="position-relative" style={{ minWidth: "350px", flex: "1" }}>
                    <input
                    type="text"
                    className="form-control ps-4 pe-5"
                    placeholder="Search by address or city"
                    />
                    <i
                    className="fa-solid fa-search position-absolute text-muted"
                    style={{
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                    }}
                    ></i>
                </div>

                <div>
                    <select className="form-select" style={{ minWidth: "80px" }}>
                    <option>For Sale</option>
                    <option>For Rent</option>
                    <option>Shortlet</option>
                    </select>
                </div>

                <div>
                    <select className="form-select" style={{ minWidth: "80px" }}>
                    <option>Price Range</option>
                    <option>₦100k - ₦500k</option>
                    <option>₦500k - ₦1M</option>
                    <option>₦1M - ₦5M</option>
                    </select>
                </div>

                <div>
                    <select className="form-select" style={{ minWidth: "80px" }}>
                    <option>Beds & Baths</option>
                    <option>1 Bed</option>
                    <option>2 Beds</option>
                    <option>3+ Beds</option>
                    </select>
                </div>

                <div>
                    <select className="form-select" style={{ minWidth: "80px" }}>
                    <option>Size</option>
                    <option>Studio / &lt;50 sqm</option>
                    <option>50 - 100 sqm</option>
                    <option>100 - 200 sqm</option>
                    <option>&gt; 200 sqm</option>
                    </select>
                </div>

                <button className="btn btn-outline-secondary">
                <i className="fa-solid fa-sliders me-2"></i> Filters
                </button>
            </div>
            <div className="row">
                {
                    properties.map((each, i)=>(
                        <div className="col-lg-3 col-sm-6" key={i}>
                        <div className="card border-0" style={{ minWidth: "16rem" }}>
                            <div className="position-relative overflow-hidden rounded">                
                            <img src={`https://picsum.photos/600/400?random=${each}`} className="card-img-top" alt="Property" />
                            
                            <button type="button"
                                className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                                <i className="fa fa-heart-o"></i>
                            </button>

                            <a href="#"
                                className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                                See More
                            </a>
                            </div>

                            <div className="card-body px-0 pt-3">
                            <h6 className="card-title mb-1">Furnished 4bdrm Duplex</h6>
                            <p className="h5 fw-bold mb-2">₦450,000</p>
                            <div className="d-flex flex-wrap text-muted small">
                                <div className="me-3"><i className="fa fa-regular fa-bed"></i> 4 beds</div>
                                <div className="me-3"><i className="fa fa-regular fa-toilet"></i> 5 toilets</div>
                                <div className="me-3"><i className="fa fa-regular fa-bath"></i> 5 baths</div>
                            </div>
                            <p className="text-muted small mt-2">Ikota, Lekki, Lagos</p>
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <Footer />
        </>
    )
}

export default Buy;