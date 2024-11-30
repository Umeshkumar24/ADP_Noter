import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiConfig';
import { Container, Row, Col, Button, Card, ListGroup, Alert } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

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

    const downloadPdf = async (noteId) => {
        try {
            console.log(`Attempting to download PDF for note ${noteId}`);
            
            const response = await apiClient.get(`/notes/${noteId}/pdf`, {
                responseType: 'blob',
                headers: {
                    'Accept': 'application/pdf'
                }
            });
            
            // Create blob URL
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            // Create temporary link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `note-${noteId}.pdf`;
            document.body.appendChild(link);
            link.click();
            
            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download error:', error);
            alert('Could not download PDF. Please make sure the note has a PDF attached.');
        }
    };

    const renderNoteItem = (note) => {
        return (
            <div>
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
            </div>
        );
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
                                {renderNoteItem(note)}
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
