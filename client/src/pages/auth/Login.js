import React, { useState } from "react";
import {toast } from "react-toastify";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { UseAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = UseAuth();
  const Host = "http://localhost:8000"

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Host}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/dashboard/admin")
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <>
      <div className="login ms-auto mt-3">
        <h1>
          <NavLink className="navbar-brand text-primary" to="/">
            Device Manager
          </NavLink>
        </h1>
        <form
          className="border p-5 shadow bg-white m-1"
          onSubmit={handleSubmit}
        >
          <div className="heading">
            <h2>Login</h2>
          </div>
          <div className=" container-fluid mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              className="form-control form-control-sm"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              className="form-control form-control-sm"
              id="exampleInputPassword1"
            />
          </div>
          <p className="statement">
            By continuing, you agree to Device Manager's Conditions of Use and Privacy
            Notice.
          </p>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-sm btn-primary">
              Continue
            </button>
          </div>
        </form>
        <div className="mb-5">
          <hr />
          <p className="text-center">New to Device Manager?</p>
          <button type="button" className="btn btn-sm btn-primary ">
            <Link className="btn btn-sm btn-primary" to="/register">
              Create your Device Manager Account
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
