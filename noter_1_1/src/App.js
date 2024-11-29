import React, { useState } from 'react';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import AuthForm from './components/AuthForm';
import { registerStudent, loginStudent } from './services/studentApi';
import { registerEducator, loginEducator } from './services/educatorApi';

const App = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState('student');
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = async (credentials, userType) => {
        try {
            let loggedInUser;
            if (userType === 'student') {
                loggedInUser = isLogin
                    ? await loginStudent(credentials)
                    : await registerStudent(credentials);
            } else {
                loggedInUser = isLogin
                    ? await loginEducator(credentials)
                    : await registerEducator(credentials);
            }
            setUser(loggedInUser.data);
        } catch (error) {
            console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
        }
    };

    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
    };

    const toggleUserType = () => {
        setUserType(userType === 'student' ? 'educator' : 'student');
    };

    return (
        <div>
            <h1>Class Notes</h1>
            {!user ? (
                <>
                    <button onClick={toggleUserType}>
                        Switch to {userType === 'student' ? 'Educator' : 'Student'}
                    </button>
                    <AuthForm 
                        userType={userType} 
                        isLogin={isLogin} 
                        onSubmit={handleAuth} 
                        onToggle={toggleAuthMode} 
                    />
                </>
            ) : (
                <>
                    {user.role === 'EDUCATOR' && <AddNote role={user.role} />}
                    <NoteList />
                </>
            )}
        </div>
    );
};

export default App;
