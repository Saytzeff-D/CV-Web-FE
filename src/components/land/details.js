import data from "../../data.json"

const Details = () => {
    return (
        <div>       
            <h5 className="fw-bold mt-4">About this Land</h5>
            <p className="text-muted">
                Discover the perfect blend of luxury and sustainability at Heritage Garden City, located in the serene environment of Agbowa, Ikorodu. This estate is designed for those who desire a modern, eco-friendly lifestyle with all the comforts of premium living.
            </p>
            <p className="text-muted">
                Location: Agbowa, Ikorodu, just 2 minutes past Choice City Estate by Lagos State Government.
            </p>

            <p className="fw-bold mt-4 small">Estate Features</p>
            <ul className="text-muted small">
                {data.landfeatures.map((a) => (
                <li className="mb-3" key={a}>
                    {a}
                </li>
                ))}
            </ul>
        </div>
    )
}

export default Details