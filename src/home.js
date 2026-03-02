import { useState } from "react";
import { Link } from "react-router-dom";
import bankImg from "./bankk.png";
import "./index.css";

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">Cache Bank</h2>

        {/* Hamburger (mobile only) */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li>
            <Link to="/" className="highlight-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/create" onClick={() => setMenuOpen(false)}>
              Create Account
            </Link>
          </li>
          <li>
            <Link to="/deposit" onClick={() => setMenuOpen(false)}>
              Deposit
            </Link>
          </li>
          <li>
            <Link to="/withdraw" onClick={() => setMenuOpen(false)}>
              Withdraw
            </Link>
          </li>
          <li>
            <Link to="/alldata" className="highlight-link" onClick={() => setMenuOpen(false)}>
              All Data
            </Link>
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
