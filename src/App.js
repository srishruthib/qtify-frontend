import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
// import Card from './components/Card/Card'; // No longer directly used in App.js
import Section from './components/Section/Section'; // NEW: Import Section component

// Import the API utility function
import { fetchTopAlbums } from './api/api';

// Placeholder for future pages/components
function HomePage() {
  const [searchData, setSearchData] = useState([]); // For Navbar search
  const [topAlbums, setTopAlbums] = useState([]); // State to store top albums

  useEffect(() => {
    // Simulate fetching data for search bar (keep this for now)
    const dummySearchData = [
      { title: 'Song A', slug: 'song-a', songs: [{ artists: ['Artist 1'] }] },
      { title: 'Album B', slug: 'album-b', songs: [{ artists: ['Artist 2', 'Artist 3'] }] },
      { title: 'Artist C', slug: 'artist-c', songs: [{ artists: ['Artist C'] }] },
    ];
    setSearchData(dummySearchData);

    // Fetch top albums when the component mounts
    const getTopAlbums = async () => {
      const data = await fetchTopAlbums();
      setTopAlbums(data);
    };

    getTopAlbums(); // Call the function to fetch data
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <Navbar searchData={searchData} />
      <Hero />

      {/* NEW: Use the Section component to display Top Albums */}
      {topAlbums.length > 0 && (
        <Section title="Top Albums" data={topAlbums} />
      )}

      {/* You can add more sections here later, e.g., for New Albums */}
    </div>
  );
}

function AlbumPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-white)' }}>
      <h1>Album Details Page</h1>
      <p>This page will show details for a specific album.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/album/:slug" element={<AlbumPage />} />
      </Routes>
    </Router>
  );
}

export default App;
