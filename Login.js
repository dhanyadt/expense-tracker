
import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [emailStatus, setEmailStatus] = useState(''); 


  const validUsername = 'User';
  const validPassword = '123';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === validUsername && password === validPassword) {
      setError('');
      onLogin(username);

      // Send login email
      emailjs.send('service_rkb21c6', 'template_q6qzrh4', {
        user_name: username, 
      }, 'XyHZD57fx_Fa4q2up')
     
      

    } else {
      setError('Invalid username or password.');
    }
  };

  const handlePasswordChange = () => {
    alert(`Password changed to: ${newPassword}`);
    setShowChangePassword(false);
    setNewPassword('');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome to Your Personalized Expense Tracker</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Login</button>

        {/* Show email status only if email has been sent successfully */}
        {emailStatus && <div className="email-status">{emailStatus}</div>}

        <p style={{ marginTop: '10px' }}>
          <button
            type="button"
            onClick={() => setShowChangePassword(!showChangePassword)}
            style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
          >
            Forgot Password?
          </button>
        </p>

        {showChangePassword && (
          <div className="change-password">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="button" onClick={handlePasswordChange}>
              Change Password
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
