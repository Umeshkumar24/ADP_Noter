import React, { useState } from 'react';
import AuthForm from './AuthForm';
import NoteList from './NoteList';
import AddNote from './AddNote';
import HandleAuth from './HandleAuth';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

const AuthPage = () => {
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState('student');
    const [isLogin, setIsLogin] = useState(null);

    const { handleAuth } = HandleAuth({ setUser, setUserType, isLogin });

    const renderDashboard = () => {
        console.log('Rendering dashboard for:', userType, 'User:', user);

        if (userType === 'educator') {
            return (
                <Container>
                    <h2>Welcome Educator{user?.username ? `, ${user.username}` : ''}</h2>
                    <AddNote
                        role="EDUCATOR"
                        educatorName={user?.username}
                    />
                </Container>
            );
        } else if (userType === 'student') {
            return (
                <Container>
                    <h2>Welcome Student{user?.username ? `, ${user.username}` : ''}</h2>
                    <NoteList />
                </Container>
            );
        }
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#" >Noter Notes</Navbar.Brand>
                <Nav className="align-items-center">
                    {!user && (
                        <Button
                            variant="outline-light"
                            className="me-2 "
                            onClick={() => setUserType(prev => prev === 'student' ? 'educator' : 'student')}
                        >
                            Switch to {userType === 'student' ? 'Educator' : 'Student'}
                        </Button>
                    )}
                    {user && (
                        <Button
                            variant="outline-light"
                            onClick={() => setUser(null)}
                        >
                            Logout
                        </Button>
                    )}
                </Nav>
            </Navbar>
            <Container className='blur'>
                <Row className="justify-content-md-center mt-5">
                    <Col md={8}>
                        {!user ? (
                            <AuthForm
                                userType={userType}
                                isLogin={isLogin}
                                onSubmit={handleAuth}
                                onToggle={() => setIsLogin(!isLogin)}
                            />
                        ) : (
                            renderDashboard()
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default AuthPage;
