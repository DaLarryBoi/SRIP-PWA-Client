import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Home.module.css';
import { useNavigate } from "react-router-dom";


function Home() {
    const navigate = useNavigate();

    let user = 'bob';
    const [people, setPeople] = useState([{name:'John Doe', amount:'690', image:'/public/avatars/cursed_donut.png'}
]);

    //check if user is logged in
    useEffect(() => {
        fetch('http://localhost:8080/home', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
            // alert("Login successful!");
            return response.json();
            } else {
            // alert("Login failed. Please try again.");
            throw new Error('Not logged in');
            }
        }).then((data) => {
            console.log("data recieved:",data);
            setPeople(data);
        }).catch((error) => {
            console.error('Error:', error);
            navigate("/login");
        });

    }, []); // The empty array ensures this effect runs once after the initial render
        

    return (
        <>
        <h1 className='text-center pt-4'>Home</h1>
        <Container className="p-4">
        <Row xs={2}> 
            {people.map((profile, index) => (
                // <Row key={index} xs={2}> 
                    <Col key={index} className= {styles["column-spacing"]}>
                        <div className={styles["card"]}>
                            <div className={styles["name"]}>
                                {profile.name}
                            </div>
                            <div className={styles["spacer"]}>
                            </div>
                            <div className={styles["infocard"]}>
                                {profile.amount}
                            </div>
                        </div>
                    </Col>
                // </Row>
            ))}
        </Row>
        </Container>
    
        <Navbar />
        </>
    );
}

export default Home;