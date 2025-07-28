import React, { useState } from 'react';
import styles from './Section.module.css';
import Card from '../Card/Card';
import Carousel from '../Carousel/Carousel'; // Import the Carousel component

function Section({ title, data }) {
  // State to manage whether the section is collapsed (showing grid) or expanded (showing carousel)
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to toggle the collapsed state
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {/* Toggle button text changes based on state */}
        <button className={styles.toggleButton} onClick={handleToggleCollapse}>
          {isCollapsed ? 'Show All' : 'Collapse'}
        </button>
      </div>

      {/* Conditional rendering: show grid when collapsed, show carousel when expanded */}
      {isCollapsed ? (
        <div className={styles.cardsContainer}> {/* This is your grid layout */}
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              follows={item.follows}
              title={item.title}
            />
          ))}
        </div>
      ) : (
        <Carousel
          data={data}
          renderComponent={(item) => ( // Pass a function to render each item as a Card
            <Card
              key={item.id}
              image={item.image}
              follows={item.follows}
              title={item.title}
            />
          )}
        />
      )}
    </div>
  );
}

export default Section;
