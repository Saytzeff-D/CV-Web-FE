import { Link } from "react-router-dom";

const SavedProperties = (props) => {
    const { savedProperties, isLoading } = props;
    return(
        <>              
            <h4 className="fw-bold mb-3 text-success">Saved Properties</h4>
            <div className="row g-3 w-100 px-md-0 px-4">
                {
                    isLoading ? 
                    <p className="fs-4 pb-5 text-muted">Loading saved properties...</p>
                    :
                    savedProperties.length === 0 
                    ? (
                        <p className="fs-4 pb-5 text-muted">No saved properties yet.</p>
                    )
                    :
                    savedProperties.map((each, i)=>(<div className="col-lg-3 col-md-6" key={i}>
                        <div className="card border-0" style={{ minWidth: "16rem" }}>
                        <div className="position-relative overflow-hidden rounded">                
                            <img src={each.main_photo} height={'200px'} className="card-img-top" alt="Property" />
                            
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
                            <h6 className="card-title mb-1">{each.name}</h6>
                            <p className="h5 fw-bold mb-2">{Number(each.total_price).toLocaleString()}</p>
                            <div className="d-flex flex-wrap text-muted small">
                                <div className="me-3 text-success fw-semibold">
                                     {each.type.charAt(0).toUpperCase() + each.type.slice(1)}
                                </div>
                            </div>
                            <p className="text-muted small mt-2">{each.address}</p>
                        </div>
                        </div>
                    </div>
                    ))
                }
            </div>
        </>
    )
};

export default SavedProperties;