import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      const res = await axios.post('http://localhost:5000/shorten', { longUrl: url });
      navigate(`/result/${res.data.shortCode}`);
    } catch (error) {
      navigate('/error');
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter URL" />
        <button type="submit">Shorten</button>
      </form>
    </div>
  );
}

export default Home;
