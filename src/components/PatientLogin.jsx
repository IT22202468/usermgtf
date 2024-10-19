import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const PatientLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const backendURL = "http://localhost:5000/api/patients/login"; // Adjust based on your API URL
            const response = await axios.post(backendURL, { email, password });

            if (response.status === 200) {
                console.log('Login successful:', response.data);
                // Store token (localStorage or cookies, depending on your approach)
                localStorage.setItem('token', response.data.token);
                navigate('/home'); // Redirect after successful login
            } else {
                setError('Login failed');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('Invalid credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Patient Login</h2>
            <form onSubmit={handleLogin}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
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
