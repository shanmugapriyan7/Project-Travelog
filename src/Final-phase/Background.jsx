import React, { useEffect, useState } from "react";
import "./Background.css";

const Background = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImageId, setSelectedImageId] = useState(null); // State to track the selected image ID

  const query = "dubai"; // Predefined query for fetching images

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching

      try {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=20`,
          {
            headers: {
              Authorization:
                "ntfx0m9Bo8eZIomHdsn3NViEaf1vFYtOlcgGPjgr69cCeNak0qFMTARU", // Replace with your actual API key
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setImages(data.photos);
      } catch (error) {
        setError("Failed to fetch images. Please try again later.");
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query]); // Fetch images when the query changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleImageClick = (id) => {
    setSelectedImageId(id); // Update the state with the clicked image ID
  };

  return (
    <div className="image-gallery">
      {images.length === 0 ? (
        <p>No images found.</p>
      ) : (
        images.map((image) => (
          <div
            className="image-container"
            key={image.id}
            style={{
              backgroundImage: `url(${image.src.medium})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "30%", // Adjust width as needed
              height: "150px", // Adjust height as needed
              marginBottom: "10px",
              borderRadius: "10px", // Adjust margin as needed
              position: "relative", // Added for positioning the button
              cursor: "pointer", // Added to indicate the container is clickable
            }}
            onClick={() => handleImageClick(image.id)}
          >
            {selectedImageId === image.id && (
              <button
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "5px",
                  border: "none",
                  position: "absolute", // Positioned relative to the container
                  bottom: "10px", // Positioned at the bottom
                  right: "10px", // Positioned at the right
                  backgroundColor: "#007bff", // Background color for the button
                  color: "#fff", // Text color for the button
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from bubbling up to the image container
                  alert("Button clicked"); // Placeholder action for button click
                }}
              >
                Select
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Background;
