import React, {useState} from "react";
import "./SearchBar.css";

const SearchBar = ({ setResults }) => {
    const [input, setInput] = useState("");

    const fetchData = async (value) => {
        if (!value) {
            setResults([]);
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/search/${value}`,{
                credentials: 'include',
                mode: 'cors'});
            const data = await response.json();
            console.log("Data:", data);
            const results = data.filter((user) => {
                return (
                    value && 
                    user && 
                    user.name.toLowerCase().includes(value)
                );
            });
            setResults(results);
            console.log(results);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className="input-wrapper">
            <img src="/navbar/magnifying-glass.svg" alt="" id="search-icon"/>
            <input type="text" 
                className="input"
                placeholder="Search Names..." 
                value={input} 
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;