import { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ email }) => {
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle password reset
    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (newPassword !== repeatPassword) {
            setError("Passwords don't match");
            setMessage('');
            return;
        }

        try {
            const response = await axios.post('/api/reset-password', { email, newPassword });
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError(error.response?.data?.message || 'Password reset failed');
            setMessage('');
        }
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <form onSubmit={handleResetPassword}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}

                <div>
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Repeat New Password:</label>
                    <input
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
