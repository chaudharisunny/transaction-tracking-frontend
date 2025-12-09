import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import AddTransaction from "./Transaction/AddTransaction";
import UpdateTransaction from "./Transaction/UpdateTransaction";
import ViewAll from "./Transaction/ViewAll";
import Signup from "./User/Signup";
import Login from "./User/Login"; // Make sure this path is correct
import AddAccount from "./Account/AddAccount";
import AllAccounts from "./Account/AllAccounts";
import UpdateAccount from "./Account/UpdateAccount";
import Analysis from "./Components/Analysis";

function AppContent() {
  const location = useLocation();
  const noLayoutRoutes = ["/register", "/login"]; // exclude both
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!hideLayout && <Sidebar />}
      <div className="flex-1">
        {!hideLayout && <Navbar />}
        <div className={hideLayout ? "" : "p-4"}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transaction/add" element={<AddTransaction />} />
            <Route path="/transaction/all" element={<ViewAll />} />
            <Route path="/transaction/update" element={<UpdateTransaction />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addaccount" element={<AddAccount />} />
            <Route path="/allaccount" element={<AllAccounts />} />
            <Route path="/updateaccount/:id" element={<UpdateAccount />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
