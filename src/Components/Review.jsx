import React from "react";
import "../Styles/Review.css";


const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "So much easier to visualize and plan a road trip to my favourite rock climbing destinations and explore the area around.",
    author: "Lydia Yang, Founder",
    link: "LydiaScapes Adventure Blog",
  },
  {
    id: 2,
    rating: 5,
    text: "Planning your trip by having all the attractions already plugged into a map makes trip planning so much easier.",
    author: "Nadia, Travel Blogger",
    link: "Couple Travel The World",
  },
  {
    id: 3,
    rating: 5,
    text: "Yesterday I walked my kids through the vacation timeline that I've built so far and their excitement levels went way up!",
    author: "Kelvin S.",
  },
  {
    id: 4,
    rating: 5,
    text: "I'm a rather extensive planner when I take trips so this was great. I liked how it auto-filled all of my travel information from my email account.",
    author: "Josh M.",
  },
];

const Review = () => {
  return (
    <section className="testimonials" id="review">
      <h1>What travelers are raving about</h1>
      <div className="testimonials-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-rating">
              {"★".repeat(testimonial.rating)}
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
            <p className="testimonial-author">
              {testimonial.author}, <a href="#">{testimonial.link}</a>
            </p>
          </div>
        ))}
      </div>
    {/* <Footer/>*/} 
    </section>
   
  );
};

export default Review;