import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
// import './AuthForm.css'; // Ensure your custom styles if any

const AuthForm = ({ userType, isLogin, onSubmit, onToggle }) => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(credentials, userType);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={10}>
                    <Card className="p-4 mt-5">
                        <Card.Body>
                            <Card.Title className="justify-content-md-center">{isLogin ? 'Login' : 'Signup'} as {userType}</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="username" 
                                        placeholder="Enter username" 
                                        value={credentials.username} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password" 
                                        name="password" 
                                        placeholder="Enter password" 
                                        value={credentials.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    {isLogin ? 'Login' : 'Signup'}
                                </Button>
                                <Button variant="link" onClick={onToggle} className="w-100 mt-2">
                                    Switch to {isLogin ? 'Signup' : 'Login'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AuthForm;
