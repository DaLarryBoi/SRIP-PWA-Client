import React, {useState, useEffect} from 'react';
import "./FriendRequestsList.css";

import FriendRequest from './FriendRequest';

const FriendRequestsList = ({requests}) => {

    // const requests = [{name: "John Doe", avatar: "/avatars/cursed_donut.png"}, 
    //     {name: "Jane Doe", avatar: "/avatars/cursed_donut.png"},]

    return (
        <div className="requests-list">
            <p></p>
            {requests.map((request, index) => {
                    return <FriendRequest request={request} key={index}/>
            })}
        </div>
    )
}

export default FriendRequestsList;