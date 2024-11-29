import React, { useState } from 'react';
import { loginStudent } from '../services/UserService';

const LoginStudent = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        loginStudent({ username, password }).then(response => {
            console.log('Student logged in:', response.data);
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
            <button type="submit">Student</button>
        </form>
    );
};

export default LoginStudent;
