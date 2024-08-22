import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
    });

    const [alert, setAlert] = useState({
        show: false,
        message: '',
        variant: 'success',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
            template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
            template_params: {
                name: formData.name,
                email: formData.email,
                feedback: formData.feedback,
            }
        };
        console.log(payload.service_id, payload.template_id, payload.user_id)
        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            setAlert({
                show: true,
                message: 'Thank you for your feedback!',
                variant: 'success',
            });
            setFormData({
                name: '',
                email: '',
                feedback: '',
            });
    
        } catch (error) {
            setAlert({
                show: true,
                message: 'There was an error sending your feedback. Please try again later.',
                variant: 'danger',
            });
            console.error('Error sending email:', error);
        }
    };
    

    return (
        <div className="container mt-5">
            <h2>Customer Feedback</h2>
            {alert.show && (
                <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible>
                    {alert.message}
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFeedback">
                    <Form.Label>Feedback</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Enter your feedback"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Feedback;
