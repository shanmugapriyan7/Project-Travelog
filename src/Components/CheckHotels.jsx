import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CheckHotels.css'; // Optional: For styling
import Navbar from './Navbar';
import Footer from './Footer';
import { AppContext } from '../Final-phase/AppContext';

const CheckHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    const {queryLocation, setQueryLocation}=useContext(AppContext);
    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            try {
                const response = await axios.get("http://localhost:3006/api/hotels");
                const hotelsData = response.data;

                // Fetch images from Pexels API for each hotel
                const updatedHotels = await Promise.all(hotelsData.map(async (hotel) => {
                    // Filter hotels based on queryLocation
                    if (hotel.location.country.toLowerCase() === queryLocation.toLowerCase()) {
                        const pexelsResponse = await axios.get(`https://api.pexels.com/v1/search`, {
                            headers: {
                                Authorization: 'ntfx0m9Bo8eZIomHdsn3NViEaf1vFYtOlcgGPjgr69cCeNak0qFMTARU' // Replace with your Pexels API key
                            },
                            params: {
                                query: hotel.name,
                                per_page: 4
                            }
                        });

                        const imageUrl = pexelsResponse.data.photos[0]?.src?.medium || ''; // Use default image if none found
                        return { ...hotel, imageUrl };
                    }
                    return null; // Return null for hotels not in the queryLocation
                }));

                // Filter out null values
                setHotels(updatedHotels.filter(hotel => hotel !== null));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchHotels();
    }, [queryLocation]); // Add queryLocation as a dependency

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
        <Navbar/>
        <div className="hotel-list" >
          
            {hotels.length > 0 ? (
                hotels.map((hotel) => (
                    <div key={hotel._id} className="hotel-card">
                        <img src={hotel.imageUrl} alt={hotel.name} className="hotel-image" />
                        <div className="hotel-info">
                            <h2>{hotel.name}</h2>
                            <p>{hotel.location.address}, {hotel.location.country}, {hotel.location.state}, {hotel.location.country}</p>
                            <p>Status: <strong>{hotel.rooms.length > 0 ? 'Open' : 'Closed'}</strong></p>
                            <p>Ratings: <strong>{hotel.ratings || 'N/A'} ⭐</strong></p>
                            <p>Price: <strong>${hotel.rooms[0].pricePerNight}</strong> / night</p>
                            <p>Room Type: <strong>{hotel.rooms[0].roomType}</strong></p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No hotels found in {queryLocation}.</p>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default CheckHotels;
