const Details = () => {
    return (
        <div>
            <div className="row w-100 g-3">
                <div className="col-3">
                <div className="p-3">
                    <p className="small mb-0 text-muted">Bedrooms</p>
                    <p className="h4">4</p>
                    <i className="fa-solid fa-bed mt-4"></i>
                </div>
                </div>
                <div className="col-3">
                <div className="p-3 border-2 border-start border-start-dashed">
                    <p className="small mb-0 text-muted">Bathrooms</p>
                    <p className="h4">2</p>
                    <i className="fa-solid fa-bath mt-4"></i>
                </div>
                </div>
                <div className="col-3">
                <div className="p-3 border-2 border-start border-start-dashed">
                    <p className="small mb-0 text-muted">Toilets</p>
                    <p className="h4">3</p>
                    <i className="fa-solid fa-toilet mt-4"></i>
                </div>
                </div>
                <div className="col-3">
                <div className="p-3 border-2 border-start border-start-dashed">
                    <p className="small mb-0 text-muted">Parking</p>
                    <p className="h4">6</p>
                    <i className="fa-solid fa-car mt-4"></i>
                </div>
                </div>
            </div>

            <h5 className="fw-bold mt-4">About this place</h5>
            <p className="text-muted">
                As your host I will make sure you feel very welcome here! There is plenty of shared space in my apartment - kitchen, large bathroom, large living room and a terrace.The spaceA lovely private room with a comfortable bed. The apartment is modern and very clean which is also noted by previous guest reviews
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