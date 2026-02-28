import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

function Withdraw({ users, setUsers, currentUser, setCurrentUser }) {
  const [amount, setAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleWithdraw = (e) => {
    e.preventDefault();

    // ⭐ safety: no user
    if (!currentUser) {
      alert("Please create an account first");
      navigate("/create");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Enter valid amount");
      return;
    }

    const withdrawAmount = Number(amount);

    if (withdrawAmount > Number(currentUser.balance)) {
      alert("Insufficient balance!");
      return;
    }

    const newBalance = Number(currentUser.balance) - withdrawAmount;

    const newTransaction = {
      type: "Withdraw",
      amount: withdrawAmount,
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
      navigate("/alldata");
    }, 1500);
  };

  return (
    <div className="withdraw-page">

      {/* 🔥 TOP POPUP */}
      {showPopup && (
        <div className="top-popup">
          ✅ Withdrawn ₹{amount}!
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar colorful-nav">
        <h2 className="logo">Cache Bank</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/deposit">Deposit</Link></li>
          <li><Link to="/withdraw" className="active-link">Withdraw</Link></li>
          <li><Link to="/alldata">All Data</Link></li>
        </ul>
      </nav>

      {/* CARD */}
      <div className="create-wrapper">
        <div className="create-card withdraw-card">
          <h2>Withdraw</h2>

          <div className="user-details">
            <p><span>Name:</span> {currentUser?.name || "-"}</p>
            <p><span>Balance:</span> ₹{currentUser?.balance ?? 0}</p>
          </div>

          <form onSubmit={handleWithdraw}>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button type="submit">Withdraw</button>
          </form>

          <Link to="/alldata" className="view-link">
            View All Users
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Withdraw;