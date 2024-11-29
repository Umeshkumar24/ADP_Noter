import React, { useState } from 'react';
import { registerStudent, loginStudent } from '../services/studentApi';
import { registerEducator, loginEducator } from '../services/educatorApi';

const AuthForm = ({ userType, isLogin, onToggle }) => {
    const [user, setUser] = useState({ username: '', password: '' });

    const handleSubmit = async () => {
        try {
            if (userType === 'student') {
                if (isLogin) {
                    await loginStudent(user);
                } else {
                    await registerStudent(user);
                }
            } else {
                if (isLogin) {
                    await loginEducator(user);
                } else {
                    await registerEducator(user);
                }
            }
            alert(`${isLogin ? 'Login' : 'Registration'} successful!`);
        } catch (error) {
            console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
        }
    };

    return (
        <div>
            <h1>{isLogin ? 'Login' : 'Signup'} as {userType}</h1>
            <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <button onClick={handleSubmit}>{isLogin ? 'Login' : 'Signup'}</button>
            <button onClick={onToggle}>
                {isLogin ? 'Signup' : 'Login'}
            </button>
        </div>
    );
};

export default AuthForm;
