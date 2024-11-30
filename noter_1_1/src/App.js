import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import AuthForm from './components/AuthForm';
import HandleAuth from './components/HandleAuth';

const App = () => {
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
        } else if (userType === 'student'){
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
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#">Noter Notes</Navbar.Brand>
                <Nav className="ml-auto">
                    {!user && (
                        <Button 
                            variant="outline-light" 
                            className="me-2"
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

export default App;
