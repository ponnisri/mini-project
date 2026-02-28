import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

function CreateAccount({ users, setUsers, setCurrentUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [initialAmount, setInitialAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  // Email validation
  const validateEmail = (value) => {
    if (value === "") {
      setEmailError("");
      return true;
    }
    const isValid = /\S+@\S+\.\S+/.test(value);
    setEmailError(isValid ? "" : "Invalid email format");
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return alert("Please enter a valid email");

    if (password.length !== 8)
      return alert("Password must be exactly 8 characters");

    if (Number(initialAmount) <= 0)
      return alert("Enter valid initial amount");

    // ✅ FIXED USER OBJECT
    const newUser = {
      name,
      email,
      balance: Number(initialAmount),
      initialAmount: Number(initialAmount), // ⭐ ADDED
      transactions: [
        {
          type: "Deposit", // ⭐ CHANGED (important for AllData)
          amount: Number(initialAmount),
          date: new Date().toLocaleString(),
          balanceAfter: Number(initialAmount),
        },
      ],
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setShowPopup(true);

    setName("");
    setEmail("");
    setPassword("");
    setInitialAmount("");
    setEmailError("");

    // Auto move to next page
    setTimeout(() => navigate("/deposit"), 1500);
  };

  return (
    <div className="create-page">
      {/* Navbar */}
      <nav className="navbar colorful-nav">
        <h2 className="logo">Cache Bank</h2>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create" className="active-link">Create</Link></li>
          <li><Link to="/deposit">Deposit</Link></li>
          <li><Link to="/withdraw">Withdraw</Link></li>
          <li><Link to="/alldata">All Data</Link></li>
        </ul>
      </nav>

      {/* Popup */}
      {showPopup && (
        <div className="top-popup show">
          🎉 Account Created Successfully!
        </div>
      )}

      {/* Form */}
      <div className="create-wrapper">
        <div className="create-card">
          <h2>Create Account</h2>

          <form onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              required
              autoComplete="off"
            />
            {emailError && <p className="error-msg">{emailError}</p>}

            <input
              type="number"
              placeholder="Initial Deposit"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              required
              min={100}
              autoComplete="off"
            />

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (8 letters/numbers)"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^[A-Za-z0-9]*$/.test(value) && value.length <= 8) {
                    setPassword(value);
                  }
                }}
                required
                autoComplete="new-password"
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️‍🗨️" : "👁️"}
              </span>

              {password && (
                <p
                  className={`password-msg ${
                    password.length === 8 ? "valid" : "invalid"
                  }`}
                >
                  {password.length === 8
                    ? ""
                    : "Password must be exactly 8 characters"}
                </p>
              )}
            </div>

            <button type="submit">Create Account</button>
          </form>

          <Link to="/alldata" className="view-link">
            View All Users
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;