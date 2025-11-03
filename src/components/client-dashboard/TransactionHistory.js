const TransactionHistory = () => {
    return (
    <>
        <h4 className="fw-bold mb-3 text-success">Transaction History</h4>
        <div className="table-responsive">
            <table className="table align-middle">
            <thead className="table-light">
                <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Trx Ref</th>
                    <th>Property</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>02 Nov 2025</td>
                    <td><span className="badge bg-success">TRX123456</span></td>
                    <td>4 Bedroom Duplex</td>
                    <td>Rent</td>
                    <td>₦750,000</td>
                    <td><span className="badge bg-success">Completed</span></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>20 Oct 2025</td>
                    <td><span className="badge bg-success">TRX123457</span></td>
                    <td>2 Bedroom Apartment</td>
                    <td>Inspection Fee</td>
                    <td>₦450,000</td>
                    <td><span className="badge bg-warning text-dark">Pending</span></td>
                </tr>
            </tbody>
            </table>
        </div>
    </>
    )
}

export default TransactionHistory;