import React, { useEffect, useState } from "react";
import { UseAuth } from "../../context/auth";
import "../style.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";

const Dashboard = () => {
  const [auth, setAuth] = UseAuth();
  const [devicesList, setDevicesList] = useState([])
  const navigate = useNavigate("");
  const Host = "http://localhost:8000"

  //get all devices
  const getAllDevices = async () => {
    try {
      const { data } = await axios.get(`${Host}/api/v1/device/get-devices`);
      if (data?.success) {
        setDevicesList(data?.devices);
      }
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllDevices();
  }, []);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div>
      {/* ======= Header ======= */}
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">

            <span className="d-none d-lg-block">Welcome: {auth.user.name}</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn" />
        </div>{/* End Logo */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search" />
              </a>

            </li>{/* End Messages Nav */}
            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                {/* <img src="assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" /> */}
                <span className="d-none d-md-block dropdown-toggle ps-2">{auth.user.username}</span>
              </a>{/* End Profile Image Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{auth.user.name}</h6>
                  <span>{auth.user.role === 1 ? "admin" : "user"}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center">
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item d-flex align-items-center" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </nav>{/* End Icons Navigation */}
      </header>{/* End Header */}
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <UserMenu />
      </aside>
      {/* End Sidebar*/}
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Dashboard</h1>
        </div>{/* End Page Title */}
        <section className="section dashboard">

          {/* Left side columns */}



          <div className="col-12">
            <div className="card recent-sales overflow-auto">

              <div className="card-body">
                <h5 className="card-title">Recent updates <span>| Today</span></h5>
                <div className="card mb-3" style={{ maxWidth: 540 }}>
                  <div className="row g-0">
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Assigned device</h5>


                        <td>
                          {auth?.user?.devices.map((deviceId) => {
                            const device = devicesList.find((dev) => dev._id === deviceId);
                            return (
                              <div key={deviceId}>
                                {device && (
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>{device.name}</td>
                                        <td>{device.type}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            );
                          })}
                        </td>



                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>

        </section>
      </main>{/* End #main */}
      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="copyright">
          © Copyright <strong><span>Device Manager</span></strong>. All Rights Reserved
        </div>
      </footer>{/* End Footer */}
    </div>

  );
};

export default Dashboard;