import React from 'react';
import '../Styles/Features.css';

const featuresData = [
  {
    title: 'Add places from guides with 1 click',
    description: 'We crawled the web so you don’t have to. Easily save mentioned places.',
    image: 'https://wanderlog.com/assets/MainFeatureTiles__addPlaces.png', 
  },
  {
    title: 'Collaborate with friends in real time',
    description: 'Plan along with your friends with live syncing and collaborative editing.',
    image: 'https://wanderlog.com/assets/MainFeatureTiles__collaborate.png',
  },
  {
    title: 'Import flight and hotel reservations',
    description: 'Connect or forward your emails to get them magically added into your trip plan.',
    image: 'https://wanderlog.com/assets/MainFeatureTiles__import.png',
  },
  {
    title: 'Expense tracking and splitting',
    description: 'Keep track of your budget and split the cost between your tripmates.',
    image: 'https://wanderlog.com/assets/MainFeatureTiles__budget.png',
  },
  {
    title: 'Checklists for anything',
    description: 'Stay organized with a packing list, to-do list, shopping list, any kind of list.',
    image: 'https://wanderlog.com/assets/MainFeatureTiles__checklist.png',
  },
  {
    title: 'Get personalized suggestions',
    description: 'Find the best places to visit with smart recommendations based on your itinerary.',
    image: 'https://wanderlog.com/assets/MainFeatureTiles__recommendations.png',
  },
];

const Features = () => {
  return (
    <div className="features" id='services'>
      <h1>Features to replace all your other tools</h1>
      <div className="features-wrapper">
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div className="feature" key={index}>
              <img src={feature.image} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
