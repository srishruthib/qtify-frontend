import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';

// Import the API utility functions
import { fetchTopAlbums, fetchNewAlbums } from './api/api'; // NEW: Import fetchNewAlbums

// Placeholder for future pages/components
function HomePage() {
  const [searchData, setSearchData] = useState([]); // For Navbar search
  const [topAlbums, setTopAlbums] = useState([]); // State to store top albums
  const [newAlbums, setNewAlbums] = useState([]); // NEW: State to store new albums

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

    // Fetch new albums when the component mounts
    const getNewAlbums = async () => { // NEW FUNCTION TO FETCH NEW ALBUMS
      const data = await fetchNewAlbums();
      setNewAlbums(data);
    };

    getTopAlbums();
    getNewAlbums(); // Call the function to fetch new albums
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div>
      <Navbar searchData={searchData} />
      <Hero />

      {/* Section for Top Albums */}
      {topAlbums.length > 0 && (
        <Section title="Top Albums" data={topAlbums} />
      )}

      {/* NEW: Section for New Albums */}
      {newAlbums.length > 0 && (
        <Section title="New Albums" data={newAlbums} />
      )}
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
