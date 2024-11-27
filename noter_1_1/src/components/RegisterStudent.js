import React, { useState } from 'react';
import { registerStudent } from '../services/UserService';

const RegisterStudent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        registerStudent({ username, password }).then(response => {
            console.log('Student registered:', response.data);
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
            <button type="submit">Register as Student</button>
        </form>
    );
};

export default RegisterStudent;
