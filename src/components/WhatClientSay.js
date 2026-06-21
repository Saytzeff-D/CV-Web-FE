import data from '../data.json';

const WhatClientsSay = () => {
    return (
        <div className="container-fluid p-md-5">
            <div className="my-5">
                <h2 className="fw-bold">Guest Stories</h2>
                <p className="text-muted fw-light">Trusted by over 10,000+ happy travelers across Nigeria</p>
            </div>
            <div className="row w-100 px-md-0 px-4">
                {data.testimonials.filter((m,i)=> i<3).map((t, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card border-0 shadow rounded-4 h-100">
                        <div className="card-body">
                            <div className="row w-100 mb-3">
                                <div className='col-md-9'>
                                    <div>
                                        <h6 className="mb-0 fw-bold">{t.name}</h6>
                                        <small className="text-theme fw-bold">{t.role}</small>
                                    </div>
                                    <p className="mt-3 text-muted">{t.text}</p>
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
                                <div className='col-md-3 d-none d-md-block'>
                                    <img
                                        src={t.img}
                                        alt={t.name}
                                        className="rounded-circle img-fluid"
                                        style={{ width: "80px", height: "70px", objectFit: "cover" }}
                                    />
                                </div>                            
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