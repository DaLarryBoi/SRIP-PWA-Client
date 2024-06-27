import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";

const CreateTransaction = () => {
    const navigate = useNavigate();

    let [receipt, setReceipt] = useState(null);
    
    const [formData, setFormData] = useState({ user: '',type: 'debt', person: '', date: '', currency: 'USD $', amount: '', description: 'no description', receipt: ''});
    const currencies = ["USD $", "EUR €", "GBP £", "CNY ¥", "JPY ¥", "INR ₹", "KRW ₩", "FRF ₣", "CAD $", "AUD$", "RUB ₽"];
    let friends = [];
    const [people, setPeople] = useState([]);
    // let people = [];

    useEffect(() => {
      //check if logged in
      fetch('http://localhost:8080/getfriends', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Not logged in');
        }
      }).then((data) => {  //data.friends = array of {name:name, id:id}, data.you = id
        console.log("data recieved:",data);
        friends = data.friends;
        // people = friends.map((friend) => friend.name);
        setPeople(friends.map((friend) => friend.name))
        console.log("friends:",friends);
        console.log("people:",people);

        setFormData({
          ...formData, 
          user: data.you}); //set user id

      }).catch((error) => {
        console.error('Error:', error);
        navigate("/login");
      });

    }, []);

    const handleInputChange = (e) => {
      if(e.target.name==='type'){
        if(e.target.value==='I Owe...'){
          setFormData({ 
            ...formData, 
            [e.target.name]: 'debt' });
        } else {
          setFormData({ 
            ...formData, 
            [e.target.name]: 'loan' });
        }
      } else if(e.target.name==='receipt'){
        setFormData({ 
          ...formData, 
          [e.target.name]: e.target.files[0] });

      } else {
        setFormData({ 
          ...formData, 
          [e.target.name]: e.target.value });
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('receipt', formData.receipt);
        console.log('filename:',formData.receipt.name);
        console.log(formData.receipt.name !== undefined)

        //form validation


        //upload receipt picture if not empty
        if (formData.receipt.name !== undefined){
          let formDatas = new FormData();
          formDatas.append('File', formData.receipt);
          console.log('uploading receipt pic')
          await fetch(`http://localhost:8080/avatar/upload`, {
            method: 'POST',
            body: formDatas,//  JSON.stringify(formData)
            credentials: 'include',
            mode: 'cors',
            // headers: {
            //   'Content-Type' : 'application/json'
            // },

          }).then(response => response.json())
            .then(data => {
              if (!data.success) {
                console.log("data:",data);
                throw new Error('Receipt could not be uploaded');
              } else {
                console.log("data:",data);
                // The URL of the file on the server
                let fileUrl = `http://localhost:8080/media/avatars/${data.filename}`; 
                setFormData({
                  ...formData, 
                  receipt: fileUrl})
              }
            }).catch((error) => { //catch errors
                console.error(error);
              });
        } else {
          //post form data
          console.log('posting the rest',formData)
          console.log('receipt url:', formData.receipt)
          await fetch(`http://localhost:8080/trackdebt`, {
            method: 'POST',
            body: formData,
            credentials: 'include',
            mode: 'cors',
            })
            .then(response => response.json())
            .then(data => {
              if (!data.success) {
                  console.log(data);
                  throw new Error("Transaction could not be created");
              } else {
                console.log('success');
                  // navigate('/home');
              }
            })
            .catch(error => {
                console.error('error: ',error);
            });
        }



        // try {
        //     console.log('Posting data:', formData)
        //     await axios.post('http://localhost:8080/manual', formData); // may need curly brackets
        //     navigate("/home");
        //     // alert('Data posted successfully!');
        // } catch (error) {
        //     console.error('Error posting data:', error);
        // };

    };

    return(
        <>
        <div className='mx-5 mt-5'>

        <div className="d-flex mb-2">
          <a className='me-1 text-decoration-none text-black h1'>&lt;</a>
          <h1 className='ms-1'>Track Transaction</h1>
        </div>
        <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
        <Form.Label>Type*</Form.Label>
        <Form.Select name = "type" onChange={handleInputChange}>
          <option>I Owe...</option>
          <option>I Loaned...</option>
        </Form.Select>
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Person*</Form.Label>
        <Form.Select placeholder="select person" 
          name = "person"
          onChange={handleInputChange}>
          <option className="d-none" value="">
              Select Person
          </option>
          {people.map((profile) => {
            return <option key={profile}>{profile} </option>
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Amount*</Form.Label>
        <div className="d-flex">
        <Form.Select className="me-1" name="currency" onChange={handleInputChange}>
          {currencies.map((currency) => {
            return <option key={currency}>{currency} </option>
          })}
        </Form.Select>
        <Form.Control className="ms-1" type="number" step=".01"
          placeholder="0.00" name='amount' onChange={handleInputChange}/>
        </div>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Date*</Form.Label>
        <Form.Control type="date" name='date' onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control type = "text" as="textarea" rows={3} 
          placeholder="Description" name='description' onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Picture of Receipt</Form.Label>
        <Form.Control name="receipt" type="file" accept=".png,.jpg,.jpeg" onChange={handleInputChange}/>
      </Form.Group>

      <Button className="w-100" variant="dark" type="submit">
        Create
      </Button>

    </Form>
    </div>
        
        <Navbar />
    </>
    )
}

export default CreateTransaction;
