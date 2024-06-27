import React from 'react';
import "./SearchResultsList.css";

import SearchResult from './SearchResult';

const SearchResultsList = ({ results }) => {
    return (
        <div className="results-list">
            {results.map((result, index) => {
                    return <SearchResult result={result} key={index}/>
            })}
        </div>
    )
}

export default SearchResultsList;