import AddListing from "../../assets/add-property.png"
import { Link } from "react-router-dom";

const ListedProperties = () => {
    const properties = [1,2,3,4];
    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="d-flex px-5 pb-5">
                        <div className="cursor-pointer"><img src={AddListing} alt="Add Listing" width={'80px'} height={'80px'} className="img-fluid" /></div>
                        <div className="ms-4 text-success fw-bold">
                            <p className="my-0 pt-3">My Listed Properties</p>
                            <p className="my-0">Total Listed {properties.length}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-3 w-100 pb-5">
                {
                    properties.map((each, i)=>(
                    <div className="col-lg-3 col-md-6" key={i}>
                        <div className="card border-0" style={{ minWidth: "16rem" }}>
                        <div className="position-relative overflow-hidden rounded">                
                            <img src={`https://picsum.photos/600/400?random=${each}`} className="card-img-top" alt="Property" />
                            
                            <button type="button"
                            className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                            <i className="fa fa-heart fa-lg text-success"></i>
                            </button>

                            <Link to={'/buy/house'}
                                className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                                See More
                            </Link>
                        </div>

                        <div className="card-body pt-3">
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
    );
}

export default ListedProperties;