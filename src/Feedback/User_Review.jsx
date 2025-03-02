import React, { useState } from 'react';
import './User_Review.css'; // Make sure to import your CSS
import img1 from '../assets/s2.jpg';
import img2 from '../assets/s3.jpg';
import img3 from '../assets/s4.jpg';
import Navbar from '../Components/Navbar';
const UserReview = () => {
  const reviews = [
    {
      id: 1,
      title: "Amazing Experience!",
      topic: "Travel",
      author: "John Doe",
      description: "I had a fantastic time exploring the mountains. Highly recommend!",
      image: img1, // Update with your image paths
    },
    {
      id: 2,
      title: "Not What I Expected",
      topic: "Accommodation",
      author: "Jane Smith",
      description: "The hotel was not as described, but the location was great.",
      image:img2,
    },
    {
        id: 1,
        title: "Amazing Experience!",
        topic: "Travel",
        author: "John Doe",
        description: "I had a fantastic time exploring the mountains. Highly recommend!",
        image: img3, // Update with your image paths
      },
    // Add more reviews as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
      <><Navbar/><br></br><br></br>
    <br></br><br></br><br></br>
      <div className="User_ReviewCarousel" style={{backgroundColor:'black'}}>
      <div className="User_ReviewList">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className={`User_ReviewItem ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={review.image} alt={review.title} />
            <div className="User_ReviewContent">
              <div className="User_ReviewAuthor">{review.author}</div>
              <h1 className="User_ReviewTitle">{review.title}</h1>
              <h2 className="User_ReviewTopic">{review.topic}</h2>
              <p className="User_ReviewDes">{review.description}</p>
             
            </div>
          </div>
        ))}
      </div>

      <div className="User_ReviewArrows">
        <button onClick={prevReview}>&lt;</button>
        <button onClick={nextReview}>&gt;</button>
      </div>

      <div className="User_ReviewThumbnail">
        {reviews.map((review, index) => (
          <div key={review.id} className="User_ReviewItem">
            <img src={review.image} alt={review.title} />
            <div className="User_ReviewContent">
              <h3 className="User_ReviewTitle">{review.title}</h3>
             
            </div>
          </div>
        ))}
      </div>

      <div className="User_ReviewTime"></div>
    </div>
    




    
    
    </>
  );
};

export default UserReview;
