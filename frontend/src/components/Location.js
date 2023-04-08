import React, { useState } from "react";
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
      const response = await axios.post(`${baseURL}/locations`, location);
      addLocation(response.data);
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
        <button type="submit" className="location-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Location;
