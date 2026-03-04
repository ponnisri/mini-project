
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import * as XLSX from "xlsx";

function AllData({ users = [] }) {
  const [storedUsers, setStoredUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
      setStoredUsers(users);
    } else {
      setStoredUsers(savedUsers);
    }
  }, [users]);

  const formatCurrency = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  const exportUserToExcel = (user) => {
    const transactions = user.transactions || [];
    const initialTransaction = transactions.find(
      (t) => t.type === "Deposit"
    );

    const initialAmount = initialTransaction
      ? Number(initialTransaction.amount)
      : 0;

    const deposits = transactions
      .filter((t) => t.type === "Deposit" && t !== initialTransaction)
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const withdrawals = transactions
      .filter((t) => t.type === "Withdraw")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const currentBalance =
      initialAmount + deposits - withdrawals;

    const data = [
      ["Name", user.name],
      ["Email", user.email],
      ["Initial Amount", initialAmount],
      ["Total Deposits", deposits],
      ["Total Withdrawals", withdrawals],
      ["Current Balance", currentBalance],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, `${user.name}_Data.xlsx`);
  };

  return (
    <div className="alldata-page">
      <nav className="navbar colorful-nav">
        <h2 className="logo">Cache Bank</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/deposit">Deposit</Link></li>
          <li><Link to="/withdraw">Withdraw</Link></li>
          <li><Link to="/alldata" className="active-link">All Data</Link></li>
        </ul>
      </nav>

      <div className="all-data-container">
        {storedUsers.length === 0 ? (
          <p className="center-text">No users yet</p>
        ) : (
          <div className="cards-grid">
            {[...storedUsers].reverse().map((user) => {
              const transactions = user.transactions || [];
              const initialTransaction = transactions.find(
                (t) => t.type === "Deposit"
              );

              const initialAmount = initialTransaction
                ? Number(initialTransaction.amount)
                : 0;

              const deposits = transactions
                .filter((t) => t.type === "Deposit" && t !== initialTransaction)
                .reduce((sum, t) => sum + Number(t.amount), 0);

              const withdrawals = transactions
                .filter((t) => t.type === "Withdraw")
                .reduce((sum, t) => sum + Number(t.amount), 0);

              const currentBalance =
                initialAmount + deposits - withdrawals;

              return (
                <div className="user-summary-card" key={user.email}>
                  <h3 className="user-name">{user.name}</h3>

                  <div className="summary-row">
                    <span>Initial Amount</span>
                    <span>{formatCurrency(initialAmount)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Total Deposits</span>
                    <span>{formatCurrency(deposits)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Total Withdrawals</span>
                    <span>{formatCurrency(withdrawals)}</span>
                  </div>

                  <div className="summary-row balance">
                    <span>Current Balance</span>
                    <span>{formatCurrency(currentBalance)}</span>
                  </div>

                  <div className="excel-btn-wrapper">
                    <button
                      className="excel-btn"
                      onClick={() => exportUserToExcel(user)}
                    >
                      Export Excel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllData;
