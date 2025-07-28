import React, { useState, useMemo } from 'react';
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Use useMemo to synchronously derive filteredSongs based on dependencies
  const filteredSongs = useMemo(() => {
    if (type === 'song' && data && genres && data.length > 0) {
      if (selectedTab === 0) { // 'All' tab
        console.log("Songs Section - Filtering: All songs (data length):", data.length);
        return data; // data here is allSongs
      } else {
        const genreKey = genres[selectedTab]?.key;
        if (genreKey) {
          const result = data.filter(song => song.genre.key === genreKey);
          console.log("Songs Section - Filtering: Genre:", genres[selectedTab]?.label, "Filtered count:", result.length);
          return result;
        }
      }
    }
    console.log("Songs Section - Filtering: Returning empty array (initial or no data)");
    return []; // Return empty array if conditions not met
  }, [selectedTab, data, genres, type]); // Dependencies for re-calculation

  // Determine which data to pass to Carousel/Grid
  const displayDataForAlbums = isCollapsed ? data.slice(0, 7) : data;
  const dataToRender = type === 'song' ? filteredSongs : displayDataForAlbums;

  // This log will now show the correct data immediately after useMemo calculates it
  if (type === 'song') {
    console.log("Songs Section - Data passed to Carousel (render):", dataToRender, "Type:", type);
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
              data={item} // Pass the entire item object
              type={type}  // Pass the type (album or song)
            />
          )}
        />
      ) : ( // Else (type is album AND isCollapsed is true), render grid
        <div className={styles.cardsContainer}>
          {displayDataForAlbums.map((item) => ( // Use displayDataForAlbums here
            <Card
              key={item.id}
              data={item} // Pass the entire item object
              type={type}  // Pass the type (album or song)
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Section;
