import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
// import SongsSection from './components/SongsSection/SongsSection'; // REMOVED: No longer needed

// Import the API utility functions
import { fetchTopAlbums, fetchNewAlbums, fetchGenres, fetchAllSongs } from './api/api'; // NEW: Import fetchGenres, fetchAllSongs

// Placeholder for future pages/components
function HomePage() {
  const [searchData, setSearchData] = useState([]); // For Navbar search
  const [topAlbums, setTopAlbums] = useState([]); // State to store top albums
  const [newAlbums, setNewAlbums] = useState([]); // State to store new albums
  const [genres, setGenres] = useState([]); // NEW: State to store genres
  const [allSongs, setAllSongs] = useState([]); // NEW: State to store all songs

  useEffect(() => {
    // Simulate fetching data for search bar (keep this for now)
    const dummySearchData = [
      { title: 'Song A', slug: 'song-a', songs: [{ artists: ['Artist 1'] }] },
      { title: 'Album B', slug: 'album-b', songs: [{ artists: ['Artist 2', 'Artist 3'] }] },
      { title: 'Artist C', slug: 'artist-c', songs: [{ artists: ['Artist C'] }] },
    ];
    setSearchData(dummySearchData);

    const fetchData = async () => {
      // Fetch all data concurrently
      const [topAlbumsData, newAlbumsData, genresData, allSongsData] = await Promise.all([
        fetchTopAlbums(),
        fetchNewAlbums(),
        fetchGenres(),
        fetchAllSongs(),
      ]);

      setTopAlbums(topAlbumsData);
      setNewAlbums(newAlbumsData);
      setGenres([{ key: 'all', label: 'All' }, ...genresData]); // Add 'All' genre at the beginning
      setAllSongs(allSongsData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar searchData={searchData} />
      <Hero />

      {/* Section for Top Albums */}
      {topAlbums.length > 0 && (
        <Section title="Top Albums" data={topAlbums} type="album" /> // Added type prop
      )}

      {/* Section for New Albums */}
      {newAlbums.length > 0 && (
        <Section title="New Albums" data={newAlbums} type="album" /> // Added type prop
      )}

      {/* NEW: Re-use Section for Songs, passing genres and allSongs */}
      {allSongs.length > 0 && genres.length > 0 && (
        <Section title="Songs" data={allSongs} type="song" genres={genres} /> // Added type and genres props
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
