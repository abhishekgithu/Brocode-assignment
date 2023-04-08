import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/constant";
import "../App.css";

function Location({ addLocation }) {
  const [location, setLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });
  const [locations, setLocations] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editLocationId, setEditLocationId] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${baseURL}/locations`);
        setLocations(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${baseURL}/locations/${editLocationId}`, location);
        setLocations(
          locations.map((loc) =>
            loc._id === editLocationId ? { ...location, _id: editLocationId } : loc
          )
        );
        setIsEditing(false);
        setEditLocationId(null);
      } else {
        const response = await axios.post(`${baseURL}/locations`, location);
        setLocations([...locations, response.data]);
      }
      setLocation({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationEdit = (location) => {
    setIsEditing(true);
    setEditLocationId(location._id);
    setLocation(location);
  };

  const handleLocationDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/locations/${id}`);
      setLocations(locations.filter((location) => location._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="location-container">
      <h2 className="location-heading">Add Location</h2>
      <form className="location-form" onSubmit={handleLocationSubmit}>
        <div className="location-form-group">
          <label htmlFor="name" className="location-label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={location.name}
            onChange={handleLocationChange}
            required
            className="location-input"
          />
        </div>
        <div className="location-form-group">
          <label htmlFor="address" className="location-label">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={location.address}
            onChange={handleLocationChange}
            required
            className="location-input"
          />
        </div>
        <div className="location-form-group">
          <label htmlFor="city" className="location-label">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={location.city}
            onChange={handleLocationChange}
            required
            className="location-input"
          />
        </div>
        <div className="location-form-group">
          <label htmlFor="state" className="location-label">
          State:
  </label>
  <input
    type="text"
    id="state"
    name="state"
    value={location.state}
    onChange={handleLocationChange}
    required
    className="location-input"
  />
</div>
<div className="location-form-group">
  <label htmlFor="country" className="location-label">
    Country:
  </label>
  <input
    type="text"
    id="country"
    name="country"
    value={location.country}
    onChange={handleLocationChange}
    required
    className="location-input"
  />
</div>
<button type="submit" className="btn-submit">
  {isEditing ? "Update Location" : "Add Location"}
</button>
</form>
  <div className="location-list-container">
    <h2 className="location-heading">Locations</h2>
    <ul className="location-list">
      {locations.map((location) => (
        <li key={location._id} className="location-list-item">
          <div className="location-details">
            <h3 className="location-details-heading">{location.name}</h3>
            <p className="location-details-text">{location.address}</p>
            <p className="location-details-text">
              {location.city}, {location.state}, {location.country}
            </p>
          </div>
          <div className="location-actions">
            <button
              className="location-action-btn location-edit-btn"
              onClick={() => handleLocationEdit(location)}
            >
              Edit
            </button>
            <button
              className="location-action-btn location-delete-btn"
              onClick={() => handleLocationDelete(location._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>
);
}
export default Location;





