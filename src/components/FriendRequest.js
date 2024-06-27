import React from 'react';
import "./FriendRequest.css";

const FriendRequest = ({ request }) => {
    const avatar = request?.avatar || "/avatars/cursed_donut.png";

    const accept = (e) => {
        console.log("Accept:", request.name);
        fetch(`http://localhost:8080/acceptrequest/${request.userid}`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error('failed to accept request');
            }
        }).then((data) => {
            console.log("response recieved:",data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }
    const decline = (e) => {
        console.log("Decline:", request.name);
        fetch(`http://localhost:8080/declinerequest/${request.userid}`, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw new Error('failed to accept request');
            }
        }).then((data) => {
            console.log("response recieved:",data);
        }).catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="friend-request">
            <img className="avatar"src={avatar} alt="" />
            <p className='name'>{request.name}</p>
            <p className='approve' onClick={(e) => accept(e)}>&#x2713;</p>
            <p className='decline' onClick={(e) => decline(e)}>&#x10102;</p>
        </div>
    )
}

export default FriendRequest;