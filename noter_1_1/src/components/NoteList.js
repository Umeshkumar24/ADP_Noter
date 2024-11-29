import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiConfig';
import { Container, Row, Col, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import axios from 'axios';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [error, setError] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await apiClient.get('/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to fetch notes:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to load notes';
            setError(errorMessage);
        }
    };

    const fetchPdf = async (noteId) => {
        try {
            setError(null);
            console.log(`Fetching PDF for note ${noteId}`);
            
            const response = await apiClient.get(`/notes/${noteId}/pdf`, { 
                responseType: 'blob',
                headers: {
                    'Accept': 'application/pdf'
                }
            });
            
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            setSelectedPdf(URL.createObjectURL(pdfBlob));
        } catch (error) {
            console.error('Failed to fetch PDF:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to load PDF';
            setError(errorMessage);
        }
    };

    const handlePdfDownload = async (noteId) => {
        try {
            const pdfBlob = await fetchNotes(noteId);
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `note-${noteId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Failed to fetch PDF:', error);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('subject', event.target.subject.value);

        try {
            await axios.post('/api/notes/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Handle success
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const downloadPdf = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/notes/${id}/pdf`, {
                responseType: 'blob'
            });
            
            console.log("Response received:", response);
            
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `note-${id}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Failed to fetch PDF:', error);
        }
    };

    return (
        <Container>
            <h1 className="my-4">All Notes</h1>
            {error && typeof error === 'string' && (
                <Alert variant="danger">{error}</Alert>
            )}
            <Row>
                <Col md={6}>
                    <ListGroup>
                        {notes.map(note => (
                            <ListGroup.Item key={note.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{note.subject}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                            Educator: {note.educatorName}
                                        </Card.Subtitle>
                                        <Button 
                                            variant="primary" 
                                            onClick={() => fetchPdf(note.id)}
                                            disabled={!note.fileContent}
                                        >
                                            View PDF
                                        </Button>
                                        <Button onClick={() => downloadPdf(note.id)}>Download PDF</Button>
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
