const ActiveBookings = () => {
    return (
        <>
        {/* <p className="text-center text-muted">No active bookings yet.</p> */}
            <h4 className="fw-bold mb-3 text-success">Active Bookings</h4>
            <div className="table-responsive">
                <table className="table align-middle">
                <thead className="table-light">
                    <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Property Type</th>
                    <th>Booking Date</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td><img src="https://picsum.photos/300/200?random=11" className="rounded" width={'100px'} height={'100px'} /></td>
                        <td>4 Bedroom Duplex</td>
                        <td>Ikota, Lekki, Lagos</td>
                        <td>Rent</td>
                        <td>02 Nov 2025</td>                        
                        <td><span className="badge bg-success">Active</span></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td><img src="https://picsum.photos/300/200?random=12" className="rounded" width={'100px'} height={'100px'} /></td>
                        <td>2 Bedroom Apartment</td>
                        <td>Ikota, Lekki, Lagos</td>
                        <td>Rent</td>
                        <td>02 Nov 2025</td>
                        <td><span className="badge bg-danger">Inactive</span></td>                        
                    </tr>
                </tbody>
                </table>
            </div>
        </>
    );
};

export default ActiveBookings;