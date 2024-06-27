import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({ fullName: '', bio: '', avatar: '', phoneNumber: ''});
  // const [res, setRes] = useState({});
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.ok) {
        alert("Register successful!");

        //login the user

        
        navigate("/home")
      } else {
        alert("Register failed. Please try again.");
      }
    })
  }
  const handleInputChange = (e) => {
    setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value });
  };

    return(
      <>
      <h1>Edit Profile</h1>
    <div className="Form">
        <Form onSubmit={handleSubmit}>
        {/* <Form.Label>
            Full Name:
            <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            />
        </Form.Label> */}
        <Form.Label>
            Name:
            <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            />
        </Form.Label>
        <label>
            Bio:
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            />
        </label>
        <Form.Label>
            phoneNumber:
            <input
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
            />
        </Form.Label>
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>
      </>
    )
}

export default EditProfile;