import React, { useState } from 'react';
import AuthForm from './AuthForm';

const AuthPage = () => {
    const [userType, setUserType] = useState('student');
    const [isLogin, setIsLogin] = useState(true);

    const toggleUserType = () => {
        setUserType(userType === 'student' ? 'educator' : 'student');
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div>
            <button onClick={toggleUserType}>
                {userType === 'student' ? 'Educator' : 'Student'}
            </button>
            <AuthForm userType={userType} isLogin={isLogin} onToggle={toggleAuthMode} />
        </div>
    );
};

export default AuthPage;
