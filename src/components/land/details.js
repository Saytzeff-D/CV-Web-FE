import data from "../../data.json"

const Details = ({ property }) => {
    return (
        <div>       
            <h5 className="fw-bold mt-4">About this Land</h5>
            <p className="text-muted">
                {property.about}
            </p>
            <p className="text-muted">
                Location: {property.address}.
            </p>

            <p className="fw-bold mt-4 small">Estate Features</p>
            <ul className="text-muted small">
                {property.amenities.map((a) => (
                <li className="mb-3" key={a}>
                    {a.name}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Details