import { Link } from "react-router-dom";

function OldData({ transactions, currentUser }) {
  const formatIndianAmount = (amount) =>
    Number(amount).toLocaleString("en-IN");

  const oldTransactions = transactions.filter(
    (item) => item.username !== currentUser.name
  );

  return (
    <div className="bank-bg">
      <nav className="navbar colorful-nav">
        <h2 className="logo">Cache Bank</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/alldata">All Data</Link></li>
        </ul>
      </nav>

      <div className="create-wrapper">
        <div className="create-card colorful-card" style={{ width: "750px" }}>
          <h2 className="center-title">📊 Old Transactions</h2>

          {oldTransactions.length === 0 ? (
            <p className="center-text">No old transactions</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Balance (Rs.)</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {oldTransactions.map((item, index) => (
                  <tr key={index}>
                    <td>{item.type}</td>
                    <td style={{ color: item.amount < 0 ? "red" : "green" }}>
                      {item.amount < 0
                        ? `-Rs. ${formatIndianAmount(Math.abs(item.amount))}`
                        : `Rs. ${formatIndianAmount(item.amount)}`}
                    </td>
                    <td>{item.date}</td>
                    <td>{item.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default OldData;
