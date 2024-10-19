import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { patientLogin } from "../Services/patientService";

const PatientLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const body = { email, password };

    try {
      const response = await patientLogin(body);

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        navigate("/"); // Redirect after successful login
      } else {
        setError("Login failed");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Login</h2>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div>
        <Link to="/signup">Don&apos;t have an account? Sign up here</Link>
      </div>
    </div>
  );
};

export default PatientLogin;
