import React from 'react';
import styles from './Cards.module.css';

const Cards = ({ id = 1, color, name, textColor, onClick, isSelected }) => {
  // Extract initials from the name
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  const cardStyle = {
    backgroundColor: isSelected ? 'rgba(47, 47, 47, 0.17)' : "", // Use blue background if the card is selected
    borderRadius:isSelected?"0.6rem":"",
    marginRight:isSelected?"0.2rem":"",
  };

  const titleStyle = {
    color: textColor || 'inherit', // Use textColor if present, otherwise use 'inherit'
  };

  return (
    <div className={styles.main} onClick={onClick} style={cardStyle}>
      <div className={styles.icon} style={{ backgroundColor: color, color: "white" }}>
        {initials}
      </div>
      <div className={styles.title} style={titleStyle}>
        {name}
      </div>
    </div>
  );
};

export default Cards;
