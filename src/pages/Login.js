// import './Form.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormSubmission = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  
  const handleInputChange = (e) => {
    setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        // alert("Login successful!");
        navigate("/home")
      } else {
        alert("Login failed. Please try again.");
      }
    })
  
  };

  return (
    <>
    <div className="p-5">
    <h1 className="text-center">Login</h1>
    <div className="Form pt-4">
        <Form onSubmit={handleSubmit}>
        <div>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
            <Form.Control
            className="w-100"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Password:</Form.Label>
            <Form.Control
            className="w-100"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            />
        </Form.Group>
        </div>
        <Button className = "w-100" variant="dark" type="submit">Submit</Button>
        </Form>
    </div>
    <p>{error}</p>
    <p className="text-center">Don't have an account? <Link to="/register">Register.</Link></p>
    </div>
    </>
  );
}

export default FormSubmission;