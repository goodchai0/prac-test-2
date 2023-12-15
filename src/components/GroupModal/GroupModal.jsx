import React, { useRef, useEffect, useState } from 'react';
import styles from './GroupModal.module.css';

const GroupModal = ({ isOpen, onClose, onColorClick, onCreateGroup, onGroupName }) => {
  const modalRef = useRef();
  const [selectedColor, setSelectedColor] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const colorOptions = [
    '#B38BFA',
    '#FF79F2',
    '#43E6FC',
    '#F19576',
    '#0047FF',
    '#6691FF',
  ];

  const handleColorClick = (color) => {
    console.log(color)
    setSelectedColor(color);
    onColorClick(color);
  };

  const handleCreateGroup = () => {
    if (!selectedColor || !groupName) {
      setMessage("Please provide both name and color.");
      return;
    }

    onCreateGroup();
    onClose(); // Close the modal after creating the group
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.show : ''}`}>
      <div className={styles.modalContent} ref={modalRef}>
        <h2>Create New group</h2>
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <div className={styles.groupName}>
          <label htmlFor="name">Group Name </label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              onGroupName(e.target.value);
              setGroupName(e.target.value)
              setMessage(""); // Clear the message when the user starts typing
            }}
          />
        </div>
        <div className={styles.chooseColor}>
          <label>Choose Color </label>
          <div className={styles.colorPicker}>
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
        </div>
        <div className={styles.create}>
          <button onClick={handleCreateGroup}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
