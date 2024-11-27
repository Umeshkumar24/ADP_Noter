import React, { useState } from 'react';
import { registerEducator } from './services/userService';

const RegisterEducator = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        registerEducator({ username, password }).then(response => {
            console.log('Educator registered:', response.data);
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
            <button type="submit">Register as Educator</button>
        </form>
    );
};

export default RegisterEducator;
