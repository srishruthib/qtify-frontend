import React, { useState } from 'react';
import styles from './Section.module.css'; // Import the CSS module
import Card from '../Card/Card'; // Import the reusable Card component

function Section({ title, data }) {
  // State to manage whether the section is collapsed or expanded
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Function to toggle the collapsed state
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Determine which data to display based on collapse state
  // For now, let's show a fixed number (e.g., 7) when collapsed
  const displayData = isCollapsed ? data.slice(0, 7) : data;

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {/* Toggle button text changes based on state */}
        <button className={styles.toggleButton} onClick={handleToggleCollapse}>
          {isCollapsed ? 'Show All' : 'Collapse'}
        </button>
      </div>
      <div className={styles.cardsContainer}>
        {displayData.map((item) => (
          <Card
            key={item.id} // Use unique ID for key
            image={item.image}
            follows={item.follows}
            title={item.title}
            // Assuming the API data provides these properties
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
