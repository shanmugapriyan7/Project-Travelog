import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { debounce } from 'lodash';

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]); 
  const [search, setSearch] = useState('');
  const [mapView, setMapView] = useState(false);

  // Default place name to be used for initial position
  const defaultPlace = 'New York City';

  const fetchLocation = async (query) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setPosition(newPosition);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const debouncedFetchLocation = useCallback(debounce(fetchLocation, 1000), []);

  useEffect(() => {
    // Fetch default location on initial render
    fetchLocation(defaultPlace);
  }, []);

  useEffect(() => {
    if (search) {
      debouncedFetchLocation(search);
    }
  }, [search, debouncedFetchLocation]);

  const handleMapToggle = () => {
    setMapView(!mapView);
  };

  return (
    <>
      <div className="select-nav-bar" onClick={handleMapToggle}>
        <i className="bx bxs-map"></i> Map view
      </div>

    <div className={`map-full ${mapView ? "hidden" : "no"}`}>
       
    <div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a location"
        style={{
          position: "fixed",
          height: "40px",
          zIndex: 10010,
          width: "250px",
          borderRadius: "20px",
          marginTop: "10px",
          marginLeft: "20%",
          padding: "10px 15px",
          border: "2px solid blue",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          fontSize: "16px",
          transition: "all 0.3s ease-in-out",
        }}
        className="map-search-input"
      />

          <MapContainer
            center={position}
            zoom={13}
            style={{
              height: '800px',
              position: 'fixed',
              marginTop: '-10px',
            }}
            className="mapContainer"
          >
            <ChangeView center={position} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={position}></Marker>
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
