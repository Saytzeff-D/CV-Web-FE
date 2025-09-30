import data from '../data.json';

const WhatClientsSay = () => {
    return (
        <div className="px-2">
            <div className="mb-5">
                <h2 className="fw-bold">What Our Clients Say:</h2>
                <h2 className="fw-bold">Real Experiences, Real Results</h2>
            </div>
            <div className="row w-100">
                {data.testimonials.map((t, index) => (
                    <div className="col-md-4 mb-4" key={index} style={{ marginTop: `${index % 2 === 0 ? 0 : 40}px` }}>
                        <div className="card border-0 shadow rounded-4 h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-3">
                            <img
                                src={t.img}
                                alt={t.name}
                                className="rounded-circle me-3"
                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                            />
                            <div>
                                <h6 className="mb-0 fw-bold">{t.name}, {t.title}</h6>
                                <small className="text-muted">{t.role}</small>
                            </div>
                            </div>
                            <p className="mb-3 text-muted">{t.text}</p>
                            <div>
                            {[...Array(5)].map((_, i) => (
                                <i
                                key={i}
                                size={18}
                                style={{color: i < t.rating ? "#FFD700" : "#ddd"}}
                                className={i < t.rating ? "fa fa-star" : "fa fa-star-o"}
                                ></i>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WhatClientsSay;