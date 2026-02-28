import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

function Deposit({ users, setUsers, currentUser, setCurrentUser }) {
  const [amount, setAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleDeposit = (e) => {
    e.preventDefault();

    // ⭐ safety check
    if (!currentUser) {
      alert("Please create an account first");
      navigate("/create");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const depositAmount = Number(amount);
    const newBalance = Number(currentUser.balance) + depositAmount;

    const newTransaction = {
      type: "Deposit",
      amount: depositAmount,
      date: new Date().toLocaleString(),
      balanceAfter: newBalance,
    };

    const updatedUser = {
      ...currentUser,
      balance: newBalance,
      transactions: [...(currentUser.transactions || []), newTransaction],
    };

    // update states
    setCurrentUser(updatedUser);
    setUsers(
      users.map((u) =>
        u.email === currentUser.email ? updatedUser : u
      )
    );

    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setAmount("");
      navigate("/withdraw");
    }, 1500);
  };

  return (
    <div className="deposit-page">
      
      {/* TOP POPUP */}
      {showPopup && (
        <div className="top-popup">
          🎉 Successfully Deposited ₹{amount}!
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">Cache Bank</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/deposit" className="active-link">Deposit</Link></li>
          <li><Link to="/withdraw">Withdraw</Link></li>
          <li><Link to="/alldata">All Data</Link></li>
        </ul>
      </nav>

      {/* MAIN CARD */}
      <div className="create-wrapper">
        <div className="create-card">
          <h2 className="center-title">Deposit</h2>

          <div className="user-details">
            <p><span>Name:</span> {currentUser?.name || "-"}</p>
            <p><span>Balance:</span> ₹{currentUser?.balance ?? 0}</p>
          </div>

          <form onSubmit={handleDeposit}>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button type="submit">Deposit</button>
          </form>

          <div className="center-text">
            <Link
              to="/alldata"
              style={{
                color: "#4facfe",
                marginTop: "15px",
                display: "inline-block",
              }}
            >
              View All Users
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;