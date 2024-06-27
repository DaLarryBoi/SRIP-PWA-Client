import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import Navbar from '../components/Navbar';
import styles from './Profile.module.css';

// const Profile = ({ user }) => {
const Profile = () => {
    let {id} = useParams();
    id = parseInt(id);
    let navigate = useNavigate();

    const [user, setUser] = useState({avatar:"/avatars/cursed_donut.png",
        name:"John Doe",
        bio:"I am a person"});

    const [self, setSelf] = useState(false);

    useEffect(() => {
        if (id === undefined || id === "" || typeof id == "string" || isNaN(id)) {
            navigate("/profile/");
        }

        //fetch
        fetch(`http://localhost:8080/profile/${id}`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) { // user exists
                return response.json();
            } else if (response.status === 404) { // user doesn't exist, 404 error
                throw new Error('Profile does not exist');
            }
            else {         // user not logged in
                throw new Error('Not logged in');
            }
        }).then((data) => {
            console.log("data recieved:",data);
            setUser(data.profile);
            if (data.you == data.profile.userid) { //check if profile is self ------ may not display correctly cuz race condition
                setSelf(true);
            }
            // console.log("self:",self); //may display false bc race condition
        }).catch((error) => {
            console.error(error);
            console.log("going to login");
            navigate("/login");
        });

    }, []); // The empty array ensures this effect runs once after the initial render

    const settings = () => {
        navigate("/settings");
    }

    const [friendRequest, setFriendRequest] = useState("add friend");

    const sendFriendRequest = () => {
        fetch(`http://localhost:8080/friendrequest/${id}`, { //id is the profile page id
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) { // user exists
                setFriendRequest("request sent");
                console.log("request sent");
            }
            else {         // user not logged in
                throw new Error('Not logged in');
            }
        }).catch((error) => {
            console.error(error);
            console.log("request failed");
        });
    }
    
    return (
        <>
        <div className='p-3 text-center'>
            <h1 className='pb-2'>Profile</h1>
            {id}
            <div>
                <img className={styles["avatar"]} src={user.avatar} alt="profile" />
                <h2 className='pt-2'>{user.name}</h2>
                <p>{user.bio}</p>
            </div>
        </div>
        {self && (
        <button className={styles["setting-icon"]} onClick={settings}>
            <img src="/navbar/gear.svg" alt=""/>
        </button>
        )}

        {!self && (
        <button className={styles["friend-request"]} onClick={sendFriendRequest}>{friendRequest}</button>
        )}

        <Navbar />
        </>
    );

}


export default Profile;