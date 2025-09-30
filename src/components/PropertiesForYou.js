import { useRef } from "react";

const PropertiesForYou = () => {
   const properties = [1,2,3,4]
   const containerRef = useRef(null);

   const scroll = (direction) => {
    const { current } = containerRef;
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
      <div className="d-flex justify-content-end d-md-none">
        <button
          className="btn btn-light btn-sm me-2 rounded-circle"
          onClick={() => scroll("left")}
          style={{width: '35px', height: '35px'}}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button
          className="btn btn-light btn-sm rounded-circle"
          style={{width: '35px', height: '35px'}}
          onClick={() => scroll("right")}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
      <div ref={containerRef} className="d-flex flex-row flex-nowrap overflow-auto my-5" style={{ scrollBehavior: "smooth" }}>
        {
          properties.map((each)=>(
            <div className="me-3">
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
  );
}

export default PropertiesForYou;
