import React, { useState, useRef, useEffect } from "react";
import styles from "./Home.module.css";
import Cards from "../../components/Cards/Cards";
import GroupModal from "../../components/GroupModal/GroupModal";
import NoteInterface from "../../components/NoteInterface/NoteInterface";
import homePage from "../../assets/image-removebg-preview1.png";
export const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ff0000"); // Default color
  const [groupName, setGroupName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [selectedGroupName, setSelectedGroupName] = useState(null);
  const [selectedGroupColor, setSelectedGroupColor] = useState(null);
// Inside your Home component
const [isRightVisible, setRightVisible] = useState(false);

// Add a function to toggle the visibility of the right side
const toggleRightVisibility = () => {
  setRightVisible(!isRightVisible);
};

  const openHandle = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };
const handleCardClick = (groupId, groupName, groupColor) => {
  setSelectedGroupId(groupId);
  setSelectedGroupName(groupName);
  setSelectedGroupColor(groupColor);

  // Show the right side when a card is clicked
  setRightVisible(true);
};


  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  useEffect(() => {
    // Retrieve groups from local storage
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    setGroups(storedGroups);
  }, []);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleGroupName = (name) => {
    console.log(name)
    setGroupName(name);
  };

  useEffect(() => {
    // Use this effect to handle changes to isRightVisible
    // Perform any additional actions you need when isRightVisible changes
    console.log("isRightVisible changed:", isRightVisible);
  }, [isRightVisible]);

  const handleCreateGroup = () => {
    const existingGroups = JSON.parse(localStorage.getItem("groups")) || [];

    // Generate a new ID based on the length of the existing groups array
    const id = existingGroups.length + 1;

    // Create a new group object
    const newGroup = {
      id,
      color: selectedColor,
      name: groupName,
    };

    // Add the new group to the array
    existingGroups.push(newGroup);

    // Store the updated array back in local storage
    localStorage.setItem("groups", JSON.stringify(existingGroups));

    // Close the modal
    handleClose();

    // Update the groups state
    setGroups(existingGroups);
  };

  return (
    <div className={styles.main}>
      <div className={`${styles.left} ${isRightVisible? styles.hideLeft : ""}`}>
        <div className={styles.pocket}>Pocket Notes</div>
        <div className={styles.leftCardsCntainer}>
          {groups.map((group) => (
            <Cards
              key={group.id}
              id={group.id}
              color={group.color}
              name={group.name}
              isSelected={group.id === selectedGroupId} // Check if the current card is selected
              onClick={() => handleCardClick(group.id, group.name, group.color)}
            />
          ))}
        </div>
        {isRightVisible || (
          <div className={styles.plus} onClick={openHandle}>
            +
          </div>
        )}
      </div>

      <div className={`${styles.right} ${isRightVisible ? "":styles.hideRight}`}>
        {/* Render the NoteInterface component when a card is clicked */}
        {!selectedGroupId || !selectedGroupName ? (
          <div style={{margin:"5rem",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",color:"black"}}>
            <img
              src={homePage}
              alt="Fallback Image"
            />
            <div  style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",maxWidth:"34vw"}}>
              <h1>Pocket Notes</h1>
              <h4>
                Send and receive messages without keeping your phone online. Use
                Pocket Notes on up to 4 linked devices and 1 mobile phone
              </h4>
            </div>
            <br></br><br></br>
            <h5>end-to-end encryted</h5>
          </div>
        ) : (
          <NoteInterface
            groupId={selectedGroupId}
            groupName={selectedGroupName}
            groupColor={selectedGroupColor}
            toggleRightVisibility={toggleRightVisibility}
          />
        )}
      </div>

      {isModalOpen && (
        <GroupModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onColorClick={handleColorClick}
          onCreateGroup={handleCreateGroup}
          onGroupName={handleGroupName}
        />
      )}
    </div>
  );
};
