import { useNavigate } from 'react-router-dom';
import data from '../../data.json'

const PropertyManager = () => {
  const properties = data.properties;
  const navigate = useNavigate()

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button onClick={()=>navigate('/admin/add-property')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          +
        </button>

        <h6 className="text-center mb-0 flex-grow-1 fw-semibold">
          Property Management
        </h6>

        <button onClick={()=>navigate('/admin/dashboard')} className="btn btn-success rounded-circle d-flex align-items-center justify-content-center custom-btn">
          ×
        </button>
      </div>

    <div className='d-flex justify-content-center'>
        <div className='col-md-9'>
            {/* Property List */}
            {properties.map((p) => (
                <div key={p.id} className="row align-items-center mb-4 w-100">
                <div className="col-5">
                    <img
                    src={p.image}
                    alt={p.title}
                    className="img-fluid rounded"
                    style={{ width: "100%", height: "auto" }}
                    />
                </div>
                <div className="col-7">
                    <div className='d-flex justify-content-between flex-md-row flex-column'>
                        <div>
                            <h6 className="fw-semibold mb-1">{p.title}</h6>
                            <p className="text-muted small mb-1">{p.location}</p>
                            <h6 className="fw-bold mb-2">{p.price}</h6>
                        </div>
                        <div>
                            <button className="btn btn-outline-success btn-sm me-2 mb-2">
                                Edit
                            </button>                            
                            <button className="btn btn-outline-danger btn-sm mb-2">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="d-flex align-items-center text-muted small gap-3">
                        <span>
                            <i className="fas fa-bed"></i> {p.beds} beds
                        </span>
                        <span>
                            <i className="fas fa-toilet"></i> {p.toilets} toilet
                        </span>
                        <span>
                            <i className="fas fa-bath"></i> {p.baths} bath
                        </span>
                    </div>
                </div>
                </div>
            ))}

            {/* See More */}
            <div className="text-center">
                <button className="btn btn-link text-dark fw-semibold">
                See more
                </button>
            </div>
        </div>
    </div>
    </div>
  );
}

export default PropertyManager;