import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import API_BASE from "../../hooks/apiUrl";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (!auth?.token) {
          // If no token is available, redirect to login page
          return setOk(false);
        }

        const res = await axios.get(API_BASE + "/api/v1/auth/admin-auth");

        if (res.data.ok) {
          setOk(true);
        } else {
          // If not authorized, redirect to home page or handle accordingly
          setOk(false);
        }
      } catch (error) {
        // Handle any errors (e.g., network issues, server errors)
        console.error("Error during admin authentication:", error);
        setOk(false);
      }
    };

    authCheck();
  }, [auth.token]);

  // Redirect to home page using Spinner if not authorized or loading
  if (!ok) {
    return <Spinner path=" " />;
  }

  // If authorized, render the Outlet (nested routes)
  return <Outlet />;
}
