const Details = ({ property }) => {
    return (
        <div>
            <div className="row w-100 g-3">
                <div className="col-3">
                <div className="p-3">
                    <p className="small mb-0 text-muted">Bedrooms</p>
                    <p className="h4">{property.bedrooms}</p>
                    <i className="fa-solid fa-bed mt-4"></i>
                </div>
                </div>
                <div className="col-3">
                <div className="p-3 border-2 border-start border-start-dashed">
                    <p className="small mb-0 text-muted">Bathrooms</p>
                    <p className="h4">{property.bathrooms}</p>
                    <i className="fa-solid fa-bath mt-4"></i>
                </div>
                </div>
                <div className="col-3">
                <div className="p-3 border-2 border-start border-start-dashed">
                    <p className="small mb-0 text-muted">Toilets</p>
                    <p className="h4">{property.toilets}</p>
                    <i className="fa-solid fa-toilet mt-4"></i>
                </div>
                </div>
                <div className="col-3">
                <div className="p-3 border-2 border-start border-start-dashed">
                    <p className="small mb-0 text-muted">Parking</p>
                    <p className="h4">{property.parking_space}</p>
                    <i className="fa-solid fa-car mt-4"></i>
                </div>
                </div>
            </div>

            <h5 className="fw-bold mt-4">About this place</h5>
            <p className="text-muted">
                {property.about}
            </p>

            <h6 className="fw-bold mt-4">What this place offers</h6>
            <ul className="offer-list text-muted small">
                {["Kitchen", "WiFi", "TV", "Refrigerator", "Washing Machine"].map((a) => (
                <li className="mb-3" key={a}>
                    <i className="fa-solid fa-circle-check text-success me-1"></i>{a}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Details