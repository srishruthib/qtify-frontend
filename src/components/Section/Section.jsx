import React, { useState, useEffect } from 'react';
import styles from './Section.module.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel';

// Material UI Tabs for genre filtering (only for songs section)
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Section({ title, data, type, genres }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0); // For song genres
  const [filteredSongs, setFilteredSongs] = useState([]); // For filtered song data

  // Effect to filter songs when selectedTab or data (allSongs) changes
  useEffect(() => {
    if (type === 'song' && data && genres && data.length > 0) { // Ensure data is not empty
      let newFilteredSongs;
      if (selectedTab === 0) { // 'All' tab
        newFilteredSongs = data; // data here is allSongs
      } else {
        const genreKey = genres[selectedTab]?.key;
        if (genreKey) {
          newFilteredSongs = data.filter(song => song.genre.key === genreKey);
        } else {
          newFilteredSongs = []; // No matching genre found
        }
      }
      setFilteredSongs(newFilteredSongs);
      // NEW: Add this console.log
      console.log("Songs Section - Filtered Songs for tab:", genres[selectedTab]?.label, newFilteredSongs);
    } else if (type === 'song' && (!data || data.length === 0)) {
        console.log("Songs Section: Data is empty or not yet loaded.");
    }
  }, [selectedTab, data, genres, type]); // Removed filteredSongs from deps to prevent infinite loop

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Determine which data to pass to Carousel/Grid
  const displayDataForAlbums = isCollapsed ? data.slice(0, 7) : data;
  const dataToRender = type === 'song' ? filteredSongs : displayDataForAlbums;

  // NEW: Add this console.log
  if (type === 'song') {
    console.log("Songs Section - Data passed to Carousel:", dataToRender, "Type:", type);
  }

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {/* Conditionally render "Show All" / "Collapse" button only for albums */}
        {type === 'album' && (
          <button className={styles.toggleButton} onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? 'Show All' : 'Collapse'}
          </button>
        )}
      </div>

      {/* Conditionally render Tabs for Songs section */}
      {type === 'song' && genres && genres.length > 0 && (
        <Box sx={{ width: '100%', marginBottom: '20px' }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="song genres tabs"
            TabIndicatorProps={{
              style: {
                backgroundColor: 'var(--color-primary)',
              },
            }}
            sx={{
              '.MuiTabs-flexContainer': {
                justifyContent: 'flex-start',
              },
              '.MuiTab-root': {
                color: 'var(--color-white)',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: '600',
                padding: '10px 20px',
                minWidth: 'unset',
                '&.Mui-selected': {
                  color: 'var(--color-white)',
                },
              },
            }}
          >
            {genres.map((genre, index) => (
              <Tab key={genre.key} label={genre.label} />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Render Carousel for songs always, and for albums when expanded */}
      {/* Ensure dataToRender is not empty before rendering Carousel */}
      {(type === 'song' && dataToRender.length > 0) || (type === 'album' && !isCollapsed) ? (
        <Carousel
          data={dataToRender}
          renderComponent={(item) => (
            <Card
              key={item.id}
              image={item.image}
              follows={type === 'song' ? item.likes : item.follows}
              title={item.title}
              countLabel={type === 'song' ? "Likes" : "Follows"}
            />
          )}
        />
      ) : ( // Else (type is album AND isCollapsed is true), render grid
        <div className={styles.cardsContainer}>
          {dataToRender.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              follows={item.follows}
              title={item.title}
              countLabel="Follows"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;
