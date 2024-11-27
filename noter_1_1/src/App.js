import React, { useState } from 'react';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import RegisterStudent from './components/RegisterStudent';
import RegisterEducator from './components/RegisterEducator';
import LoginStudent from './components/LoginStudent';
import LoginEducator from './components/LoginEducator';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };

    return (
        <div>
            <h1>Class Notes</h1>
            {!user ? (
                <>
                    <RegisterStudent />
                    <RegisterEducator />
                    <LoginStudent onLogin={handleLogin} />
                    <LoginEducator onLogin={handleLogin} />
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

