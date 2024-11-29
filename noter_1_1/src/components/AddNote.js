import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { createNote } from '../services/noteApi';

const AddNote = ({ role, educatorName }) => {
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (role !== 'EDUCATOR') {
            setAlertVariant('danger');
            setAlertMessage('Only educators can create notes');
            setShowAlert(true);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('subject', subject);
            formData.append('file', file);
            formData.append('educatorName', educatorName);

            const response = await createNote(formData);
            setAlertVariant('success');
            setAlertMessage('Note created successfully!');
            setShowAlert(true);
            
            // Reset form
            setSubject('');
            setFile(null);
            
        } catch (error) {
            setAlertVariant('danger');
            setAlertMessage('Error creating note. Please try again.');
            setShowAlert(true);
            console.error('Error creating note:', error);
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    {showAlert && (
                        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                            {alertMessage}
                        </Alert>
                    )}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label>Upload Note File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Add Note
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddNote;
