import React, { useState } from 'react';
import { loginEducator } from '../services/UserService';

const LoginEducator = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginEducator({ username, password }).then(response => {
            console.log('Educator logged in:', response.data);
            onLogin(response.data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Educator</button>
        </form>
    );
};

export default LoginEducator;
