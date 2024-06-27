import React from 'react';
import "./SearchResult.css";
import { useNavigate } from "react-router-dom";

const SearchResult = ({ result }) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        console.log("Clicked on:", result.name, result.userid);
        navigate(`/profile/${result.userid}`);

    }

    return (
        <div className="search-result" onClick={(e) => handleClick(e)}>
            <img className="avatar"src={result.avatar} alt="" />
            <p className='name'>{result.name}</p>
        </div>
    )
}

export default SearchResult;