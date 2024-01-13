import React, { useEffect, useState } from "react";
import { UseAuth } from "../../context/auth";
import "../style.css"
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [auth, setAuth] = UseAuth();
  const [users, setUsers] = useState();
  const navigate = useNavigate("");
  const [devicesList, setDevicesList] = useState([])
  const Host = "http://localhost:8000"

   // get all devices
   const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${Host}/api/v1/auth/get-users`);
      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };

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
    getAllUsers();
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

  const renderUserDevices = (userDevices) => {
    const userDeviceNames = devicesList
      .filter((device) => userDevices.includes(device._id))
      .map((device) => device.name);

    return userDeviceNames.join(', ');
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
            <span className="d-none d-md-block dropdown-toggle ps-2">{auth.user.name}</span>
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
  <AdminMenu/>
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
                <div className="filter">
                  <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots" /></a>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>
                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Recent Users</h5>
                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Devices</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                    {users?.map((user, index) => (
                          <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{renderUserDevices(user.devices)}</td>
                            <td> <span className={user.status === "Active" ? "badge bg-success" : "badge bg-danger"}>
                              {user.status}
                            </span></td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      
    </section>
  </main>{/* End #main */}
  {/* ======= Footer ======= */}
  <footer id="footer" className="footer">
    <div className="copyright">
      © Copyright <strong><span>NiceAdmin</span></strong>. All Rights Reserved
    </div>
  </footer>{/* End Footer */}
</div>

  );
};

export default AdminDashboard;