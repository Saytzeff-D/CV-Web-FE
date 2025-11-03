const Earnings = () => {
    return (
    <>
        <h4 className="fw-bold mb-3 text-success">Available Earnings: N500,000</h4>
        <p className="text-success">We take 15% for every successful Transaction from your Property listing</p>
        <div className="table-responsive">
            <table className="table align-middle">
            <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Date</th>                    
                    <th>Property</th>
                    <th>Type</th>
                    <th>Listed Price</th>
                    <th>Commission (15%)</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>02 Nov 2025</td>                    
                    <td>4 Bedroom Duplex</td>
                    <td>Rent</td>
                    <td>₦750,000</td>
                    <td>₦112,500</td>
                    <td>₦637,500</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>20 Oct 2025</td>                    
                    <td>2 Bedroom Apartment</td>
                    <td>Inspection Fee</td>
                    <td>₦450,000</td>
                    <td>₦67,500</td>
                    <td>₦382,500</td>
                </tr>
            </tbody>
            </table>
        </div>
    </>
    )
}

export default Earnings;