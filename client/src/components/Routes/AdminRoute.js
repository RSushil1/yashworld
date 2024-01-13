import { useState, useEffect } from "react";
import { UseAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = UseAuth();
  const Host = "https://yashworld.vercel.app"

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${Host}/api/v1/auth/admin-auth`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        setOk(res.data.ok);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;