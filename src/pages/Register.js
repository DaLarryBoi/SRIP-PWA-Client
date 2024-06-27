// import './Form.css';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { type } from "@testing-library/user-event/dist/type";
// import { useHistory } from "react-router-dom";

const FormSubmission = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', passwordConfirmation: ''});
  // const [res, setRes] = useState({});
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //submition stuff
    // try {
    //     console.log('Posting data:', formData)
    //     await axios.post('http://localhost:8080/register', formData)
    //     .then(response => {
    //       console.log('data received: ', response)
    //       setRes(response)
    //       console.log('res: ', res)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       setRes(error)
    //     toast.error(error.response.data.error)})
    //     console.log(typeof res)

    //     if (!res.error) {
    //         // console.log('redirecting')
    //         // navigate("/profile");
    //     }
    //     else {
    //         console.log('error present')
    //         console.log(res.error)
    //         setError(res.error)
    //         console.log('test')
    //     }
        
    //   } catch (error) {
    //     alert('Error posting data:', error)
    //     console.error('Error posting data:', error);
    // };

    fetch('http://localhost:8080/register', {
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
  
  };

  return (
    <>
    <h1>Register</h1>
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
        <Form.Group>
          <Form.Label>Email:</Form.Label>
            <Form.Control
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
            <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Label>
            Confirm Password:
            <input
            type="password"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
            />
        </Form.Label>
        <Button className="w-100"variant="dark" type="submit">Submit</Button>
        </Form>
    </div>
    {/* <p>{error}</p> */}
    <p>Already have an account? <Link to="/login">Login.</Link></p>
    <ToastContainer />
    </>
  );
}

export default FormSubmission;