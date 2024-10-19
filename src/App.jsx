import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./pages/Signup";
import PatientLogin from "./components/PatientLogin";
import ForgotPassword from "./components/ForgotPassword";
import VerifyOTP from "./components/VerifyOTP";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<PatientLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<VerifyOTP />} />
          <Route path="/" element={<Home />} />
          <Route path="/reset-password/:hash" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
