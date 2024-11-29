import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import AuthForm from './components/AuthForm';
import { registerStudent, loginStudent } from './services/studentApi';
import { registerEducator, loginEducator } from './services/educatorApi';
import EducatorDashboard from './components/EducatorDashboard';

const App = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null);
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
            setUserType(userType);
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
        <>
            <Navbar bg="dark" variant="dark" expand="lg-bg">
                <Navbar.Brand href="#">Noter Notes</Navbar.Brand>
                <Nav className="ml-auto">
                    <Button variant="outline-light" onClick={toggleUserType}>
                        Switch to {userType === 'student' ? 'Educator' : 'Student'}
                    </Button>
                </Nav>
            </Navbar>
            <Container className='blur'>
                <Row className="justify-content-md-center mt-5">
                    <Col md={6}>
                        {!user ? (
                            <AuthForm
                                userType={userType}
                                isLogin={isLogin}
                                onSubmit={handleAuth}
                                onToggle={toggleAuthMode}
                            />
                        ) : (
                            userType === 'educator' ? (
                                <EducatorDashboard educator={user} />
                            ) : (
                                <>
                                    {user.role === 'EDUCATOR' && <AddNote role={user.role} />}
                                    <NoteList />
                                </>
                            )
                        )}
                    </Col>
                </Row>
            </Container >
        </>
    );
};

export default App;
