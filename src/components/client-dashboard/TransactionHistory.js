import { useSelector } from "react-redux";

const TransactionHistory = (props) => {
    const {transactions, isLoading} = props;
    const currency = useSelector(state=>state.CurrencyReducer.currency);
    const rates = useSelector(state=>state.CurrencyReducer.rates);
    return (
    <>
        <h4 className="fw-bold mb-3 text-success">Transaction History</h4>
        {
            isLoading ? 
            <p className="fs-4 pb-5 text-muted">Loading...</p>
            :
            transactions.length === 0 
            ? (
                <p className="fs-4 pb-5 text-muted">No transactions found.</p>
            )
            :
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
                    {
                        transactions.map((trx, i)=>(
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{new Date(trx.created_at).toLocaleDateString()}</td>
                                <td><span className="badge bg-success">{trx.reference}</span></td>
                                <td>{trx.name}</td>
                                <td>{trx.type.toUpperCase()}</td>
                                <td>{Number(trx.amount * (rates[currency] || 1)).toLocaleString('en-NG', {style: 'currency', currency})}</td>
                                <td><span className={`badge ${trx.status === "success" ? "bg-success" : "bg-warning text-dark"}`}>{trx.status}</span></td>
                            </tr>
                        ))
                    }                    
                </tbody>
                </table>
            </div>
        }
    </>
    )
}

export default TransactionHistory;