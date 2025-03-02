import React, { useState } from "react";
import "./Note.css";
import Restaurant from "./Restaurant";

const Note = () => {
  const [heading, setHeading] = useState("Notes");
  const [text, setText] = useState("");
  const [isNoteVisible, setIsNoteVisible] = useState(true);
  const [isEditingHeading, setIsEditingHeading] = useState(false);

  const handleHeadingChange = (e) => {
    setHeading(e.target.value);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const toggleNoteVisibility = () => {
    setIsNoteVisible(!isNoteVisible);
  };

  const toggleEditHeading = () => {
    setIsEditingHeading(!isEditingHeading);
  };

  return (
    <div className="Notes-body">
      <div className="notes-body0">
        <div className="note-heading-container">
          {isEditingHeading ? (
            <input
              type="text"
              value={heading}
              onChange={handleHeadingChange}
              onBlur={toggleEditHeading}
              className="note-heading"
              placeholder="Enter heading"
              autoFocus
            />
          ) : (
            <h2 className="note-heading-text" onClick={toggleNoteVisibility}>
              {heading}
            </h2>
          )}
          <button className="edit-button" onClick={toggleEditHeading}>
            <i className="bx bx-pencil"></i>
          </button>
        </div>
        {isNoteVisible && (
          <textarea
            value={text}
            onChange={handleTextChange}
            className="note-text"
            placeholder="Enter your notes here..."
            style={{
              borderRadius: "10px",
            }}
          ></textarea>
        )}
      </div>
      <Restaurant />
    </div>
  );
};

export default Note;
