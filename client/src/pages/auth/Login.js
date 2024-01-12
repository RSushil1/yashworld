import React, { useState } from "react";
import {toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UseAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = UseAuth();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
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
        navigate(location.state || "/");
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
            <img
              src="/image/tl.png"
              alt="Logo"
              width={50}
              height={35}
              className="d-inline-block align-text-top ms-auto "
            />
            MegaMart
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
              aria-describedby="emailHelp"
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
            By continuing, you agree to MegaMart's Conditions of Use and Privacy
            Notice.
          </p>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button type="submit" className="btn btn-sm btn-warning">
              Continue
            </button>
          </div>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed text-primary"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Need Help?
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse m-2 p-2"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  <NavLink
                    className="link-offset-2 link-dark link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/forgot-password"
                  >
                    Forget Passwod ➡️
                  </NavLink>
                  <hr/>
                  <NavLink
                    className="link-offset-2 link-dark link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  >
                   Other issues with Sign-In
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="mb-5">
          <hr />
          <p className="text-center">New to MegaMart?</p>
          <button type="button" className="btn btn-sm btn-warning ">
            <Link className="btn btn-sm" to="/register">
              Create your MegaMart Account
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
