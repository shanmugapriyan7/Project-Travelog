import React, { useState } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import "./FeedbackForm.css";
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        feedback: '',
        ratings: 0
    });

    const handleStarClick = (rating) => {
        setFormData({
            ...formData,
            ratings: rating
        });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3006/api/feedback', formData);

            if (response.status === 201) {
                alert('Feedback submitted successfully');
                setFormData({ name: '', feedback: '', ratings: 0 });
            }
        } catch (error) {
            alert('An error occurred while submitting feedback.');
        }
    };

    return (
        <>
        <Navbar/>
        <div className="feed-body">
          
        <div className="feedback-form-container">
            <h1 className="form-title">Submit Your Feedback</h1>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name:</label><br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="feedback" className="form-label">Feedback:</label><br />
                    <textarea
                        id="feedback"
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        rows="4"
                        className="form-textarea"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-labelF">Ratings:</label><br />
                    <div className="star-rating">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <FaStar
                                    key={index}
                                    size={30}
                                    className={`star ${ratingValue <= formData.ratings ? 'active' : ''}`}
                                    onClick={() => handleStarClick(ratingValue)}
                                />
                            );
                        })}
                    </div>
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
        </div>
        <Footer/>
        </>
    );
};

export default FeedbackForm;
