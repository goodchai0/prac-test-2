import React, { useState, useEffect, useRef } from "react";
import Cards from "../Cards/Cards";
import styles from './NoteInterface.module.css';

const NoteInterface = ({ groupId, groupName, groupColor, toggleRightVisibility }) => {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Retrieve notes from local storage based on the group id
    const storedNotes = JSON.parse(localStorage.getItem(`notes_${groupId}`)) || [];
    setNotes(storedNotes);
  }, [groupId]);

  const handleNoteChange = (event) => {
    setNoteText(event.target.value);
  };

  const handleSaveNote = () => {
    // Add the new note to the array
    const newNote = {
      id: notes.length + 1,
      text: noteText,
    };
    const updatedNotes = [...notes, newNote];

    // Store the updated notes back in local storage
    localStorage.setItem(`notes_${groupId}`, JSON.stringify(updatedNotes));

    // Clear the note text
    setNoteText("");

    // Update the component state
    setNotes(updatedNotes);

    // Focus on the textarea after saving
    textareaRef.current.focus();
  };

  const handleBackArrowClick = () => {
    // Hide the right side and show the left side
    toggleRightVisibility();
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.backArrow} onClick={handleBackArrowClick}>←</div>
        <Cards id={1} color={groupColor} name={groupName} textColor={"white"} />
      </div>
      <div className={styles.noteArea}>
        {notes.map((note) => (
          <div className={styles.note} key={note.id}>
            <p>{note.text}</p>
          </div>
        ))}
      </div>
      <div className={styles.textareaContainer}>
        <textarea
          className={styles.textarea}
          ref={textareaRef}
          value={noteText}
          onChange={handleNoteChange}
        />
       <button
  className={styles.arrowButton}
  onClick={handleSaveNote}
  disabled={!noteText.trim()}
>
{noteText.trim() ?
  <img
    src="src\assets\Vector.png"
    alt="Save Note"
    className={styles.noteImage}
  />:
  <img
    src="src\assets\Vector1.png"
    alt="Save Note"
    className={styles.noteImage}
    style={{width:"2rem" ,fontSize:"large", fontWeight:"600"}}
  />}
</button>
      </div>
    </div>
  );
};

export default NoteInterface;
