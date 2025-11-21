const ActiveBookings = (props) => {
    const { bookings, isLoading } = props; 
    return (
        <>        
            <h4 className="fw-bold mb-3 text-success">Active Bookings</h4>
            {
                isLoading ? 
                <p className="fs-4 pb-5 text-muted">Loading active bookings...</p>
                : bookings.length === 0 ? (
                    <p className="text-muted fs-5">No active bookings yet.</p>
                )
                :
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
                        {
                            bookings.map((booking, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><img src={booking.main_photo} className="rounded" width={'100px'} height={'100px'} /></td>
                                    <td>{booking.name}</td>
                                    <td>{booking.address}</td>
                                    <td>{booking.type}</td>
                                    <td>{new Date(booking.start_date).toLocaleDateString()}</td>
                                    <td><span className={`badge ${booking.status === 'active' ? 'bg-success' : 'bg-danger'}`}>{booking.status}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
            }
        </>
    );
};

export default ActiveBookings;