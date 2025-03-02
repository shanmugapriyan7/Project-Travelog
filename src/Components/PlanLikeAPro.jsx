import React from 'react';
import '../Styles/PlanLikeAPro.css';

const plansData = [
  {
    title: 'Offline access',
    description: 'No wifi, no problem. Your trip plans are locally downloaded for access anywhere.',
    image: 'https://wanderlog.com/assets/LandingPageProFeatureTiles__offline.png', 
  },
  {
    title: 'Unlimited attachments',
    description: 'Never dig through your emails again — access all your trip files and PDFs in one place.',
    image: 'https://wanderlog.com/assets/LandingPageProFeatureTiles__attachments.png',
  },
  {
    title: 'Optimize your route',
    description: 'Perfect for road trips and saving $$$ on gas! Get the best route auto-rearranged.',
    image: 'https://wanderlog.com/assets/LandingPageProFeatureTiles__optimize.png',
  },
];

const PlanLikeAPro = () => {
  return (
    <div className="plan-like-a-pro">
      <h1>Plan like a Pro</h1>
      <p>Unlock premium features like offline access, unlimited attachments, flight deals, export to Google maps, and <a href="#">much more</a></p>
      <div className="plans-wrapper">
        <div className="plans-grid">
          {plansData.map((plan, index) => (
            <div className="plan" key={index}>
              <img src={plan.image} alt={plan.title} />
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanLikeAPro;
