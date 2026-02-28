import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./home";
import CreateAccount from "./create";
import Deposit from "./deposite"; // ⭐ FIXED spelling
import Withdraw from "./withdraw";
import AllData from "./alldata";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/create"
        element={
          <CreateAccount
            users={users}
            setUsers={setUsers}
            setCurrentUser={setCurrentUser}
          />
        }
      />

      <Route
        path="/deposit"
        element={
          <Deposit
            users={users}
            setUsers={setUsers}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        }
      />

      <Route
        path="/withdraw"
        element={
          <Withdraw
            users={users}
            setUsers={setUsers}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        }
      />

      <Route path="/alldata" element={<AllData users={users} />} />
    </Routes>
  );
}

export default App;