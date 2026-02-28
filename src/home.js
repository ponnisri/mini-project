import { Link } from "react-router-dom";
import bankImg from "./bankk.png";
import "./index.css";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Cache Bank</h2>
        <ul className="nav-links">
          <li>
            <Link to="/" className="highlight-link">Home</Link>
          </li>
          <li>
            <Link to="/create">Create Account</Link>
          </li>
          <li>
            <Link to="/deposit">Deposit</Link>
          </li>
          <li>
            <Link to="/withdraw">Withdraw</Link>
          </li>
          <li>
            <Link to="/alldata" className="highlight-link">All Data</Link>
          </li>
        </ul>
      </nav>

      {/* Scrolling Text */}
      <div className="marquee">
        <p>
          🚀 Fast Transactions | ⚡ Instant Deposits | 🔐 100% Secure Banking
        </p>
      </div>

      {/* Main Content */}
      <div className="home-container">
        <h1 className="title">
          💰 Welcome to <span>Cache Bank</span>
        </h1>

        <div className="image-box">
          <img src={bankImg} alt="Bank" />
        </div>
      </div>
    </div>
  );
}

export default Home;