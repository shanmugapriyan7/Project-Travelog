import React, { useState } from "react";
import "./Restaurant.css";

const Restaurant = () => {
  const [heading, setHeading] = useState('Add a title (eg.,"Restaurant")');
  const [isNoteVisible, setIsNoteVisible] = useState(true);
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [lists, setLists] = useState([
    {
      items: [],
      newItem: "",
      images: {},
      details: {},
    },
  ]);

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const toggleNoteVisibility = () => {
    setIsNoteVisible(!isNoteVisible);
  };

  const toggleEditHeading = () => {
    setIsEditingHeading(!isEditingHeading);
  };

  const handleAddItem = (index) => {
    const updatedLists = [...lists];
    const list = updatedLists[index];

    if (list.newItem.trim()) {
      const newIndex = list.items.length;
      list.items.push(list.newItem);
      list.details[newIndex] = `Details about ${list.newItem}...`;
      list.images[`${newIndex}`] = ""; // Initialize empty image URL
      list.newItem = "";
    }

    setLists(updatedLists);
  };

  const handleRemoveItem = (listIndex, itemIndex) => {
    const updatedLists = [...lists];
    const list = updatedLists[listIndex];

    list.items = list.items.filter((_, i) => i !== itemIndex);
    delete list.details[itemIndex];
    delete list.images[itemIndex];

    setLists(updatedLists);
  };

  const handleImageChange = (listIndex, itemIndex, url) => {
    const updatedLists = [...lists];
    const list = updatedLists[listIndex];

    list.images[`${itemIndex}`] = url;
    setLists(updatedLists);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior of Enter key (e.g., form submission)
      handleAddItem(index);
    }
  };

  const handleAddList = () => {
    setLists([
      ...lists,
      {
        items: [],
        newItem: "",
        images: {},
        details: {},
      },
    ]);
  };

  const handleDeleteList = (index) => {
    const updatedLists = lists.filter((_, i) => i !== index);
    setLists(updatedLists);
  };

  return (
    <>
      {lists.map((list, listIndex) => (
        <div key={listIndex} className="Res-body">
          <div className="Res-heading-container">
            {isEditingHeading ? (
              <input
                type="text"
                value={heading}
                onChange={handleHeadingChange}
                onBlur={toggleEditHeading}
                className="Res-heading"
                placeholder="Enter heading"
                autoFocus
              />
            ) : (
              <h2 className="Res-heading-text" onClick={toggleNoteVisibility}>
                {heading}
              </h2>
            )}
            <button className="edit-button" onClick={toggleEditHeading}>
              <i className="bx bx-pencil"></i>
            </button>
            <button
              className="delete-list-button"
              onClick={() => handleDeleteList(listIndex)}
            >
              <i className="bx bx-trash"></i>
            </button>
          </div>
          {isNoteVisible && (
            <>
              <div className="Res-content-list">
                {list.items.map((item, index) => (
                  <div key={index} className="res-item">
                    <div className="res-content">
                      <div className="res-info">
                        <div className="res-name">
                          <span className="res-index">
                            {index + 1}. {item}
                          </span>
                        </div>
                        <div className="res-details">
                          <p>{list.details[index]}</p>
                        </div>
                      </div>
                      {list.images[index] && (
                        <div className="place-image-container">
                          <img
                            src={list.images[index]}
                            alt="Place"
                            className="place-image"
                          />
                        </div>
                      )}
                    </div>
                    <div className="remove-res-button">
                      <button
                        onClick={() => handleRemoveItem(listIndex, index)}
                        className="remove-button"
                      >
                        <i className="bx bx-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="res-add-item">
                <input
                  type="text"
                  value={list.newItem}
                  onChange={(e) => {
                    const updatedLists = [...lists];
                    updatedLists[listIndex].newItem = e.target.value;
                    setLists(updatedLists);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, listIndex)}
                  placeholder="Add a place"
                />
              </div>
            </>
          )}
        </div>
      ))}
      <button className="add-list-button" onClick={handleAddList}>
        + New List
      </button>
    </>
  );
};

export default Restaurant;
