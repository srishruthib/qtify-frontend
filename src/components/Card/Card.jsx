import React from 'react';
import styles from './Card.module.css'; // Import the CSS module
import Chip from '@mui/material/Chip'; // Import Material UI Chip

function Card({ image, follows, title }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
        <div className={styles.chipWrapper}>
          {/* Material UI Chip for displaying follows */}
          <Chip
            label={`${follows} Follows`}
            size="small"
            className={styles.chip}
          />
        </div>
      </div>
      <div className={styles.titleSection}>
        <p className={styles.cardTitle}>{title}</p>
      </div>
    </div>
  );
}

export default Card;
