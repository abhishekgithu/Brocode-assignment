import React, { useState, useEffect } from "react";
import { baseURL } from "./utils/constant";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Location from "./components/Location";
import User from "./components/User";

function App() {
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/locations`).then((res) => {
      console.log(res.data);
      setLocations(res.data);
    });

    axios.get(`${baseURL}/users`).then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const addLocation = (location) => {
    axios
      .post(`${baseURL}/locations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(location),
      })
      .then((data) => setLocations([...locations, data]));
  };

  const addUser = (user) => {
    axios
      .post(`${baseURL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
      .then((data) => setUsers([...users, data]));
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/locations" element={<Location addLocation={addLocation} />} />
          <Route exact path="/users" element={<User addUser={addUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
