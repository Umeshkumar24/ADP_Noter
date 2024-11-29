import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { createNote } from '../services/noteService';

const AddNote = ({ role }) => {
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [educatorName, setEducatorName] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role !== 'EDUCATOR') {
            setAlertMessage('Only educators can create notes');
            setShowAlert(true);
            return;
        }

        const formData = new FormData();
        formData.append('subject', subject);
        formData.append('file', file);
        formData.append('educatorName', educatorName);

        createNote(formData).then(response => {
            console.log('Note created:', response.data);
            setAlertMessage('Note created successfully!');
            setShowAlert(true);
        }).catch(error => {
            console.error('Error creating note:', error);
            setAlertMessage('Error creating note. Please try again.');
            setShowAlert(true);
        });
    };

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    {showAlert && <Alert variant={role !== 'EDUCATOR' ? 'danger' : 'success'}>{alertMessage}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formFile">
                            <Form.Label>Upload Note File</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEducatorName">
                            <Form.Label>Educator Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter educator name"
                                value={educatorName}
                                onChange={(e) => setEducatorName(e.target.value)}
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
