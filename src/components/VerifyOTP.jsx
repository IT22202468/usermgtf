import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patientVerifyOtp } from "../Services/patientService";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  // Assuming you have the email from previous form
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendMessage, setResendMessage] = useState("");

  // Handle OTP submission
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await patientVerifyOtp(otp);
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.setItem("random", response.data.randomDigit);
        navigate(`/reset-password/${response.data.randomDigit}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || "OTP verification failed");
      setMessage("");
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await axios.post("/api/forgot-password", { email });
      setResendMessage("OTP has been resent to your email.");
      setError("");
    } catch (error) {
      setError("Failed to resend OTP.");
      setResendMessage("");
    }
  };

  return (
    <div className="verify-otp-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <div>
          <label>OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Verify OTP</button>
      </form>

      <div className="resend-otp-section">
        {resendMessage && <p style={{ color: "green" }}>{resendMessage}</p>}
        <p>
          Didn&apos;t receive the OTP?{" "}
          <button onClick={handleResendOtp}>Resend OTP</button>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
