import AddListing from "../../assets/add-property.png"
import { Link, useNavigate } from "react-router-dom";

const ListedProperties = (props) => {
    const { properties } = props;
    const navigate = useNavigate()
    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <div className="d-flex px-5 pb-5">
                        <div className="cursor-pointer" onClick={()=>navigate('/agent/add-property')}><img src={AddListing} alt="Add Listing" width={'80px'} height={'80px'} className="img-fluid" /></div>
                        <div className="ms-4 text-success fw-bold">
                            <p className="my-0 pt-3">My Listed Properties</p>
                            <p className="my-0">Total Listed: {properties.length} <span className="ps-5">Pending: {properties.filter(prop => prop.publicized === '0').length}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {
                properties.length === 0 
                ? (
                    <p className="text-center fs-4 pb-5 text-muted">You have not listed any property yet.</p>
                )
                : (
                    <div className="row g-3 w-100 pb-5 px-md-0 px-4">
                        <div className="table-responsive">
                            <table className="table align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Main Photo</th>
                                    <th>Created At</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    properties.map((each, i)=>(
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td><img src={each.main_photo} alt={each.name} className="img-fluid" /></td>
                                            <td>{new Date(each.created_at).toLocaleDateString()}</td>
                                            <td>{each.name}</td>                                    
                                            <td>{each.category.charAt(0).toUpperCase() + each.category.slice(1)}</td>
                                            <td>{each.type}</td>
                                            <td>{each.total_price}</td>
                                            <td><span className={`badge ${each.publicized == '1' ? 'bg-success' : 'bg-warning'}`}>{each.publicized == '1' ? 'Approved' : 'Pending'}</span></td>
                                        </tr>
                                    ))
                                }                                                
                            </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ListedProperties;