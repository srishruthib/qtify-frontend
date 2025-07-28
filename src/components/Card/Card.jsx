import React from 'react';
import styles from './Card.module.css';
import Chip from '@mui/material/Chip';

// Added countLabel prop to dynamically display "Follows" or "Likes"
function Card({ image, follows, title, countLabel = "Follows" }) { // Default to "Follows"
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
        <div className={styles.chipWrapper}>
          <Chip
            label={`${follows} ${countLabel}`} // Use countLabel here
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
