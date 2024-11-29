import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddNote from './AddNote';

const EducatorDashboard = ({ educator }) => {
    return (
        <Container>
            <Row className="mt-4">
                <Col>
                    <h2>Welcome, {educator.username}!</h2>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <AddNote 
                        role="EDUCATOR" 
                        educatorName={educator.username} 
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default EducatorDashboard; 