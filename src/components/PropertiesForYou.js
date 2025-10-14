import { useRef } from "react";
import { Link } from "react-router-dom";

const PropertiesForYou = () => {
   const properties = [1,2,3,4]
   const containerRef1 = useRef(null);
   const containerRef2 = useRef(null);
   const containerRef3 = useRef(null);

   const scroll = (direction, ref) => {    
    const { current } = ref;
    if (current) {
      const cardWidth = 260; // card min-width + margin (adjust as needed)
      current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
   }

  return (
    <div className="container my-5">
      <h2 className="my-4">Properties For You</h2>
      <p className="text-muted mb-4">
        Tailored Property Listings to Match Your Lifestyle
      </p>
      
      <div className="">
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button className="nav-link active border-0 text-dark" data-bs-toggle="tab" data-bs-target="#buy">
              Buy
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link border-0 text-dark" data-bs-toggle="tab" data-bs-target="#rent">
              Rent
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link border-0 text-dark" data-bs-toggle="tab" data-bs-target="#shortlet">
              Shortlet
            </button>
          </li>
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="buy">
            <div className="d-flex justify-content-end d-md-none">
              <button
                className="btn btn-light btn-sm me-2 rounded-circle"
                onClick={() => scroll("left", containerRef1)}
                style={{width: '35px', height: '35px'}}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-light btn-sm rounded-circle"
                style={{width: '35px', height: '35px'}}
                onClick={() => scroll("right", containerRef1)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div ref={containerRef1} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
              {
                properties.map((each, i)=>(
                  <div className="me-3" key={i}>
                    <div className="card border-0" style={{ minWidth: "16rem" }}>
                      <div className="position-relative overflow-hidden rounded">                
                        <img src={`https://picsum.photos/600/400?random=${each}`} className="card-img-top" alt="Property" />
                        
                        <button type="button"
                          className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                          <i className="fa fa-heart-o"></i>
                        </button>

                        <Link to={'/buy/house'}
                            className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                            See More
                        </Link>
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

          <div className="tab-pane fade" id="rent">
            <div className="d-flex justify-content-end d-md-none">
              <button
                className="btn btn-light btn-sm me-2 rounded-circle"
                onClick={() => scroll("left", containerRef2)}
                style={{width: '35px', height: '35px'}}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-light btn-sm rounded-circle"
                style={{width: '35px', height: '35px'}}
                onClick={() => scroll("right", containerRef2)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div ref={containerRef2} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
              {
                properties.map((each, i)=>(
                  <div className="me-3" key={i}>
                    <div className="card border-0" style={{ minWidth: "16rem" }}>
                      <div className="position-relative overflow-hidden rounded">                
                        <img src={`https://picsum.photos/600/400?random=${each+4}`} className="card-img-top" alt="Property" />
                        
                        <button type="button"
                          className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                          <i className="fa fa-heart-o"></i>
                        </button>

                        <Link to={'/rent/house'}
                            className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                            See More
                        </Link>
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

          <div className="tab-pane fade" id="shortlet">
            <div className="d-flex justify-content-end d-md-none">
              <button
                className="btn btn-light btn-sm me-2 rounded-circle"
                onClick={() => scroll("left", containerRef3)}
                style={{width: '35px', height: '35px'}}
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-light btn-sm rounded-circle"
                style={{width: '35px', height: '35px'}}
                onClick={() => scroll("right", containerRef3)}
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div ref={containerRef3} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
              {
                properties.map((each, i)=>(
                  <div className="me-3" key={i}>
                    <div className="card border-0" style={{ minWidth: "16rem" }}>
                      <div className="position-relative overflow-hidden rounded">                
                        <img src={`https://picsum.photos/600/400?random=${each+8}`} className="card-img-top" alt="Property" />
                        
                        <button type="button"
                          className="btn btn-sm position-absolute top-0 end-0 m-2 d-flex align-items-center justify-content-center text-white bg-transparent" style={{zIndex: 2}}>
                          <i className="fa fa-heart-o"></i>
                        </button>

                        <Link to={'/shortlet/abuja'}
                            className="overlay d-flex align-items-center justify-content-center text-decoration-none text-uppercase fw-bold text-white">
                            See More
                        </Link>
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
        </div>
      </div>
    </div>
  );
}

export default PropertiesForYou;
