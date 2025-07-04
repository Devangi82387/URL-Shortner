import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Result.css';

function Result() {
  const { shortCode } = useParams();
  return (
    <div>
      <h2>Short URL:</h2>
      <a href={`http://localhost:5000/${shortCode}`} target="_blank" rel="noreferrer">
        {shortCode}
      </a>
      <br />
      <Link to="/">Shorten another</Link>
    </div>
  );
}

export default Result;
