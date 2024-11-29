import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Card, ListGroup } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        axios.get('/api/notes').then(response => {
            setNotes(response.data);
        });
    }, []);

    const fetchPdf = async (noteId) => {
        try {
            const response = await axios.get(`/api/notes/${noteId}/pdf`, { responseType: 'blob' });
            setSelectedPdf(URL.createObjectURL(response.data));
        } catch (error) {
            console.error('Failed to fetch PDF:', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">All Notes</h1>
            <Row>
                <Col md={6}>
                    <ListGroup>
                        {notes.map(note => (
                            <ListGroup.Item key={note.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{note.subject}</Card.Title>
                                        <Card.Text>{note.content}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            Educator: {note.educatorName}
                                        </Card.Subtitle>
                                        <Button variant="primary" onClick={() => fetchPdf(note.id)}>
                                            View PDF
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col md={6}>
                    {selectedPdf && (
                        <div style={{ height: '750px' }}>
                            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}>
                                <Viewer fileUrl={selectedPdf} plugins={[defaultLayoutPluginInstance]} />
                            </Worker>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default NoteList;
