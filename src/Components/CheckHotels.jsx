import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './CheckHotels.css'; 
import Navbar from './Navbar';
import Footer from './Footer';
import { AppContext } from '../Final-phase/AppContext';
import HomeNavBar from '../Mid-phase/HomeNavBar';

const CheckHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { queryLocation } = useContext(AppContext);

    useEffect(() => {
        const fetchHotels = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("http://localhost:3006/api/general/hotels");
                const hotelsData = response.data;

                const filteredHotels = hotelsData.filter(
                    hotel => hotel.location.country.toLowerCase() === queryLocation.toLowerCase()
                );

                const updatedHotels = await Promise.all(
                    filteredHotels.map(async (hotel) => {
                        try {
                            const pexelsResponse = await axios.get(`https://api.pexels.com/v1/search`, {
                                headers: {
                                    Authorization: 
                                    'ntfx0m9Bo8eZIomHdsn3NViEaf1vFYtOlcgGPjgr69cCeNak0qFMTARU'
                                },
                                params: { query: hotel.name, per_page: 1 }
                            });

                            const imageUrl = pexelsResponse.data.photos[0]?.src?.medium || '';
                            return { ...hotel, imageUrl };
                        } catch {
                            return { ...hotel, imageUrl: '' };
                        }
                    })
                );

                setHotels(updatedHotels);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (queryLocation) fetchHotels();
    }, [queryLocation]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <HomeNavBar/>
            <div className="hotel-list">
                {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                        <div key={hotel._id} className="hotel-card">
                            <img
                                src={hotel.imageUrl || '/default-hotel.jpg'}
                                alt={hotel.name}
                                className="hotel-image"
                            />
                            <div className="hotel-info">
                                <h2>{hotel.name}</h2>
                                <p>
                                    {hotel.location.address}, {hotel.location.city}, {hotel.location.state}, {hotel.location.country}
                                </p>
                                <p>Status: <strong>{hotel.rooms?.length > 0 ? 'Open' : 'Closed'}</strong></p>
                                <p>Ratings: <strong>{hotel.ratings || 'N/A'} ⭐</strong></p>
                                {hotel.rooms?.[0] ? (
                                    <>
                                        <p>Price: <strong>${hotel.rooms[0].pricePerNight}</strong> / night</p>
                                        <p>Room Type: <strong>{hotel.rooms[0].roomType}</strong></p>
                                    </>
                                ) : (
                                    <p>No room information available.</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hotels found in {queryLocation}.</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default CheckHotels;
