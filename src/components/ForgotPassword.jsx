import { useState } from "react";
import { patientForgotPassword } from "../Services/patientService";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const body = { email };

    try {
      const response = await patientForgotPassword(body);
      setMessage(response.data.message);
      navigate("/verifyotp");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
