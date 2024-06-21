import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../Components/Loader";

function PrivateRoute() {
  const [ok, setOk] = useState(null); // initially null to indicate loading
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    // Simulating an async check for token
    setTimeout(() => {
      if (token) {
        setOk(true);
      } else {
        setOk(false);
      }
    }, 100); // Simulate network delay
  }, [token]);

  if (ok === null) return <Loader />; // Show loader while checking
  return ok ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
