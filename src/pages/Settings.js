import React from 'react';

import { useNavigate } from "react-router-dom";

const Settings = () => {
    let navigate = useNavigate();

    let logout = () => {
        console.log("Logging out");
        fetch(`http://localhost:8080/logout`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error('failed to logout');
            }
        }).then((data) => {
            console.log("logged out:",data);
            navigate("/login");
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <>
        <h1>Settings</h1>
        <button onClick={() => navigate("/profile")}>Back</button>
        <button onClick={() => navigate("/edit")}>Edit</button>
        <button onClick={() => logout()}>Log out</button>
        </>
    );
}

export default Settings;