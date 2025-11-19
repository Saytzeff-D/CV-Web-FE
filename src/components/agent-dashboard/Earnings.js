import { useSelector } from "react-redux";

const Earnings = (props) => {
    const { transactions, balance } = props;
    const currency = useSelector(state=>state.CurrencyReducer.currency);
    const rates = useSelector(state=>state.CurrencyReducer.rates);
    return (
    <>
        <h4 className="fw-bold mb-3 text-success">Available Earnings: {Number(balance * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</h4>
        <p className="text-success">We take 15% for every successful Transaction from your Property listing</p>
        {
            transactions.length === 0 
            ? (
                <p className="fs-4 pb-5 text-muted">No earnings yet.</p>
            )
            : (
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
                        {
                            transactions.map((each, i)=>(
                                <tr key={i}>
                                    <td>{i +1}</td>
                                    <td>{new Date(each.created_at).toLocaleDateString()}</td>                    
                                    <td>{each.name}</td>
                                    <td>{each.type.toUpperCase()}</td>
                                    <td>{Number(each.listed_price * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</td>
                                    <td>{Number(each.commission * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</td>
                                    <td>{Number(each.balance * rates[currency]).toLocaleString('en-NG', {style: 'currency', currency})}</td>
                                </tr>                        
                            ))
                        }
                    </tbody>
                    </table>
                </div>
            )
        }
    </>
    )
}

export default Earnings;