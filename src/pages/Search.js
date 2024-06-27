import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SearchBar from '../components/SearchBar';
import SearchResultsList from '../components/SearchResultsList';
import FriendRequestsList from '../components/FriendRequestsList';

import Navbar from '../components/Navbar';
import styles from './Search.module.css';

const Search = () => {
    let navigate = useNavigate();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/checkloggedin', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Not logged in');
            }
        }).then((data) => {
            console.log("data recieved:",data);

        }).catch((error) => {
            console.error('Error:', error);
            navigate("/login");
        });

    }, []);

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/pendingrequests', {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('failed to get pending requests');
            }
        }).then((data) => {
            console.log("data recieved:",data);
            setRequests(data);
        }).catch((error) => {
            console.error('Error:', error);
        });

    }, []);

    return (
        <>
        <div className='p-3'>
        <h1 className='text-center pt-4 pb-4'>Find Friends</h1>
        <SearchBar setResults={setResults}/>
        <SearchResultsList results={results}/>
        
        <h1 className='text-center pt-5 pb-4'>Incoming Requests</h1>
        <FriendRequestsList requests={requests}/>

        </div>
        <Navbar />
        </>
    );
}

export default Search;
