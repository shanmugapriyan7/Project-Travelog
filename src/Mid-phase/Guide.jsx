import React, { useState } from "react";
import "../Mid-phase/Sin.css";

const guides = [
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/yitfaNaah1Cxyrnht6TDK7dxn2U1EtMW",
    title: "Japan: Video Game Guide",
    description:
      "Did a summer internship in Japan during 2019. StayDid a summer...",
    author: "Tuyet",
    likes: 700,
    views: 36971,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/nVcKOvDayw1nqzNpujgTkW87DxRG9Al6",
    title: "Paris 5 Day Tourist Itinerary",
    description:
      "I've studied abroad in Paris. Other than that, I've visited Paris another...",
    author: "Elisa Li",
    likes: 517,
    views: 106091,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/SCRtrLxeQVrE8b3yth24MT6gEfUkZ3x2",
    title: "Puerto Rico Guide",
    description:
      "This is a collection of 'best of' since I moved to the island at the beginn...",
    author: "Gillian Morris",
    likes: 144,
    views: 28151,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/mfouv5cyFZEKO5cRLOn3AWgpfFY1m8Ra",
    title: "Boston Walking Tour",
    description:
      "I lived in the area for 2 years during gl lived in the area for 2 years...",
    author: "DX",
    likes: 93,
    views: 6551,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/9sJ1h5E0Dr1YYoNyQg2Wlt6FyPX9wljb",
    title: "Asheville & Pisgah National Fore....",
    description: "Annual visitor to Asheville, NC and Pisgah Natl Forest. 🌲",
    author: "vimal",
    likes: 353,
    views: 265625,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/tKDNyT1cBp8JICSXYcPRWQziA7zaScNT",
    title: "Four National Parks in Colorado",
    description:
      "We spent 11 days on this trip in late May 2024. If we had it to do over, we would have spent less time in RMNP since it was so early in the season.",
    author: "shanmuga",
    likes: 654,
    views: 14135,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/13ErTg1RSl6Icpd1ioqGc3eMsRXCKLC9",
    title: "🍝Rome 3 Day Travel Itinerary",
    description:
      "I visited Rome in June 2024, and here’s my curated 3-day itinerary to help you experience the city’s best. It includes tips on booking tickets, must-see attractions, and where to find the best food!",
    author: "sudha",
    likes: 961,
    views: 36635,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/QiB6jNfYNZziakXeO5BH83CtNub7Ns2r",
    title: "🇯🇵 Free and easy 4 days in Osaka",
    description:
      "For our second trip to Osaka, we decided to take things easy and enjoy the food, drinks and sights of the city.",
    author: "Alvin Lee",
    likes: 230,
    views: 4396,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/BNbqsPbSjQV8EJPi8eUE83hYbd3dYGDa",
    title: "Anime Travels: A Photographer's Guide📸",
    description:
      "Big fan of travel and gaming! I've hit up Japan several times since 2018 for the Pokémon and Yu-Gi-Oh! World Champs and some cool tech events. Each trip's been a blast with loads of great memories!",
    author: "Lee",
    likes: 896512,
    views: 31699898,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/kfSXtEQn3QyflUWbLLSv23roAGCqQovd",
    title: "Gluten Free in Verona, Italy",
    description:
      "We were only in Verona for a day trip, in April 2024, so there were few place....",
    author: "Alvin Lee",
    likes: 25990,
    views: 86489,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/te3PiLJfjgJMbRhrMXe0i5ein6IH0mE7",
    title: "Gluten Free in London, England",
    description:
      "We only visited London for 24 hours (in March 2024), but I did lots of....",
    author: "Alvin Lee",
    likes: 161,
    views: 8436,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/xopmroWWGbqFSsF9QvnnMDas0x4JiG7r",
    title: "Celine’s Taipei Handbook",
    description:
      "I usually stay in Taipei when visiting relatives yearly, I’ll also be living in....",
    author: "Alvin Lee",
    likes: 1586,
    views: 7594,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/GckyQsD003J9LQUg6GubRMsuVNvm0k5N",
    title: "Gluten Free in Porto, Portugal",
    description:
      "We visited Porto for 3 days (April 2024). We had some tummy troubles....",
    author: "Alvin Lee",
    likes: 230,
    views: 4396,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/HeNNpX2pGJloQJ78GAoNvxOwD7exwOVK",
    title: "Gluten Free in Budapest, Hungary",
    description:
      "We travelled to Budapest for 3 days in April 2024. We were able to try many places with gluten free food. This is a....",
    author: "Alvin Lee",
    likes: 230,
    views: 4396,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/JQMYrZNq1tikgRwJpMFkaoseful0thxj",
    title: "Vancouver Wandering: Kailin Edition",
    description: "Kailin's extremely awesome guide to Vancouver wandering.",
    author: "Kailin Edition",
    likes: 230,
    views: 4396,
  },
  {
    image:
      "https://itin-dev.sfo2.cdn.digitaloceanspaces.com/freeImageSmall/VVWEo1C3lMZAo1J4q7pY934n9znKXwLf",
    title: "South Korea Roadtrip Guide",
    description:
      "Visited South Korea for three and a half weeks in October 2023. This was....",
    author: "Alvin Lee",
    likes: 230,
    views: 4396,
  },
  // Add more guides as needed
];

const handleCardClick = (guide) => {
  console.log("Guide clicked:", guide);
  // Example: navigate to a guide details page
  // window.location.href = `/guide/${guide.id}`;
};

const TravelGuides = () => {
  const initialVisibleCount = 8; // Number of guides to display initially
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const showMoreGuides = () => {
    setVisibleCount((prevCount) => prevCount + initialVisibleCount);
  };

  const showFewerGuides = () => {
    setVisibleCount(initialVisibleCount);
  };

  return (
    <div className="travel-guides">
      <h3>Explore travel guides and itineraries</h3>
      <br></br>
      <br></br>
      <div className="search-bar">
        <input type="text" placeholder="Search for a destination" />
      </div>
      <br></br>
      <div className="popular-destinations">
        <h8>Or browse our most popular destinations:</h8>
        <br></br>
      </div>
      <button className="ja">Japan</button>
      <button className="oa">Oahu</button>
      <br></br>
      <br></br>

      <h4 className="re">Recent guides</h4>

      <div className="guides-grid">
        {guides.slice(0, visibleCount).map((guide, index) => (
          <div
            className="guide-card"
            key={index}
            onClick={() => handleCardClick(guide)}
          >
            <img src={guide.image} alt={guide.title} />
            <div className="guide-info">
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
              <div className="guide-author">
                <span>{guide.author}</span>
                <span>❤️ {guide.likes}</span>
                <span>👁️ {guide.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br></br>
      <br></br>
      {visibleCount < guides.length ? (
        <div className="see-more-container">
          <button className="see-more-button" onClick={showMoreGuides}>
            See More
          </button>
        </div>
      ) : (
        <div className="see-fewer-container">
          <button className="see-fewer-button" onClick={showFewerGuides}>
            See Fewer
          </button>
        </div>
      )}
    </div>
  );
};

export default TravelGuides;
