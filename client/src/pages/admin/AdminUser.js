import React, { useEffect, useState } from "react";
import { UseAuth } from "../../context/auth";
import "../style.css";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";

const AdminDevices = () => {
  const [auth] = UseAuth();
  const [users, setUsers] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [devices, setDevices] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDevices, setEditDevices] = useState([]);
  const [editUsername, setEditUsername] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [devicesList, setDevicesList] = useState([])
  const Host = "http://localhost:8000";

  // get all devices
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${Host}/api/v1/auth/get-users`);
      if (data?.success) {
        setUsers(data?.users);
        setEdit(false);
      }
    } catch (error) {
      toast.error("Something went wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [edit]);

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

  const handleDeviceCheckboxChange = (deviceId, e) => {
    const isChecked = e.target.checked;

    setDevices((prevDevices) => {
      if (isChecked) {
        return [...prevDevices, deviceId];
      } else {
        return prevDevices.filter((id) => id !== deviceId);
      }
    });
  };
// edit modal
  const handleEditDeviceCheckboxChange = (deviceId, e) => {
    const isChecked = e.target.checked;

    setEditDevices((prevDevices) => {
      if (isChecked) {
        return [...prevDevices, deviceId];
      } else {
        return prevDevices.filter((id) => id !== deviceId);
      }
    });
  };

  // create device function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${Host}/api/v1/auth/register`, {
        name,
        email,
        phone,
        devices,
        username,
        password,
        status,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setEdit(true);
        setName("");
        setEmail("");
        setPhone("");
        setDevices("");
        setUsername("");
        setPassword("");
        setStatus("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  // delete device function
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${Host}/api/v1/auth/delete-user/${id}`
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setEdit(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  const handleEdit = async (id, e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${Host}/api/v1/auth/update-user/${id}`,
        {
          name: editName,
          email: editEmail,
          phone: editPhone,
          devices: editDevices,
          username: editUsername,
          status: editStatus,
        }
      );
      if (data?.success) {
        toast.success(data.message);
        setEdit(true);
        setName("");
        setEmail("");
        setPhone("");
        setDevices("");
        setUsername("");
        setPassword("");
        setStatus("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  const renderUserDevices = (userDevices) => {
    const userDeviceNames = devicesList
      .filter((device) => userDevices.includes(device._id))
      .map((device) => device.name);

    return userDeviceNames.join(', ');
  };

  const autofill = (id) => {
    const userToEdit = users?.find((user) => user._id === id);
  
    if (userToEdit) {
      // Set the edit states with the user data
      setEditName(userToEdit.name || "");
      setEditEmail(userToEdit.email || "");
      setEditPhone(userToEdit.phone || "");
      setEditDevices(userToEdit.devices || []);
      setEditUsername(userToEdit.username || "");
      setEditStatus(userToEdit.status || "");
    }
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
        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search" /></button>
          </form>
        </div>{/* End Search Bar */}
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
              </a>{/* End Profile Iamge Icon */}
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
                  <a className="dropdown-item d-flex align-items-center" href="#">
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>{/* End Icons Navigation */}
      </header>{/* End Header */}
      {/* ======= Sidebar ======= */}
      <aside id="sidebar" className="sidebar">
        <AdminMenu />
      </aside>
      {/* End Sidebar*/}
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Users</h1>
        </div>{/* End Page Title */}
        <section className="section dashboard">
          <div className="row">
            {/* Left side columns */}
            <div>
              <div>
                <div className="card recent-sales overflow-auto">
                  <div className="card-body">
                    <div>
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        className="btn btn-primary m-3"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"

                      >
                        Create New User
                      </button>
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Create User
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              />
                            </div>
                            <div className="modal-body">
                              <form onSubmit={handleCreate} className="row g-3">
                                <div className="col-12">
                                  <label htmlFor="inputName" className="form-label">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    placeholder="Write a name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                </div>
                                <div className="col-12">
                                  <label htmlFor="inputEmail" className="form-label">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </div>
                                <div className="col-12">
                                  <label htmlFor="inputPhone" className="form-label">
                                    Phone
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputPhone"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                  />
                                </div>
                                <div className="col-12">
                                  <label htmlFor="inputDevices" className="form-label">
                                    Devices
                                  </label>
                                  {
                                    devicesList?.map((dl) => (
                                      <div className="form-check" key={dl._id}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`checkbox-${dl._id}`}
                                          onChange={(e) => handleDeviceCheckboxChange(dl._id, e)}
                                          checked={devices.includes(dl._id)}
                                        />
                                        <label className="form-check-label" htmlFor={`checkbox-${dl._id}`}>
                                          {dl.name}
                                        </label>
                                      </div>
                                    ))
                                  }
                                </div>

                                <div className="col-12">
                                  <label htmlFor="inputUsername" className="form-label">
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputUsername"
                                    placeholder="Choose a username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                  />
                                </div>
                                <div className="col-12">
                                  <label htmlFor="inputPassword" className="form-label">
                                    Password
                                  </label>
                                  <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <div className="form-floating">
                                    <select
                                      name="status"
                                      value={status}
                                      onChange={(e) => setStatus(e.target.value)}
                                      className="form-select"
                                      id="floatingSelectGrid11"
                                    >
                                      <option defaultValue />
                                      <option value="Active">
                                        Active
                                      </option>
                                      <option value="Deactive">
                                        Deactive
                                      </option>

                                    </select>
                                    <label htmlFor="floatingSelectGrid">Status</label>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                    Save changes
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <table className="table table-borderless datatable">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Devices</th>
                          <th scope="col">Username</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users?.map((user, index) => (
                          <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{renderUserDevices(user.devices)}</td>
                            <td>{user.username}</td>
                            <td> <span className={user.status === "Active" ? "badge bg-success" : "badge bg-danger"}>
                              {user.status}
                            </span></td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm ms-1"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm ms-1"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={()=> autofill(user._id)}
                              >
                                Edit
                              </button>
                              {/* Modal */}
                              <div
                                className="modal fade"
                                id="staticBackdrop"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex={-1}
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                              >
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                        Edit User
                                      </h1>
                                      <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                      />
                                    </div>
                                    <div className="modal-body">
                                      <form onSubmit={(e) => handleEdit(user._id, e)} className="row g-3">

                                      <div className="col-12">
                                  <label htmlFor="inputName" className="form-label">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputName"
                                    placeholder="Write a name"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                  />
                                </div>
                                <div className="col-12">
                                  <label htmlFor="inputEmail" className="form-label">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    placeholder="Enter email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                  />
                                </div>
                                <div className="col-12">
                                  <label htmlFor="inputPhone" className="form-label">
                                    Phone
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputPhone"
                                    placeholder="Enter phone number"
                                    value={editPhone}
                                    onChange={(e) => setEditPhone(e.target.value)}
                                  />
                                </div>
                                <div className="col-12">
                                  <label htmlFor="inputDevices" className="form-label">
                                    Devices
                                  </label>
                                  {
                                    devicesList?.map((dl) => (
                                      <div className="form-check" key={dl._id}>
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`checkbox-${dl._id}`}
                                          onChange={(e) => handleEditDeviceCheckboxChange(dl._id, e)}
                                          checked={editDevices.includes(dl._id)}
                                        />
                                        <label className="form-check-label" htmlFor={`checkbox-${dl._id}`}>
                                          {dl.name}
                                        </label>
                                      </div>
                                    ))
                                  }
                                </div>

                                <div className="col-12">
                                  <label htmlFor="inputUsername" className="form-label">
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputUsername"
                                    placeholder="Choose a username"
                                    value={editUsername}
                                    onChange={(e) => setEditUsername(e.target.value)}
                                  />
                                </div>
                                <div className="col-md-6">
                                  <div className="form-floating">
                                    <select
                                      name="status"
                                      value={editStatus}
                                      onChange={(e) => setEditStatus(e.target.value)}
                                      className="form-select"
                                      id="floatingSelectGrid11"
                                    >
                                      <option defaultValue />
                                      <option value="Active">
                                        Active
                                      </option>
                                      <option value="Deactive">
                                        Deactive
                                      </option>

                                    </select>
                                    <label htmlFor="floatingSelectGrid">Status</label>
                                  </div>
                                </div>

                                        <div className="modal-footer">
                                          <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                          >
                                            Close
                                          </button>
                                          <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                            Update
                                          </button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>{/* End Left side columns */}
          {/* Right side columns */}
          <div className="col-lg-4">
            {/* Recent Activity */}

          </div>{/* End Right side columns */}

        </section >
      </main > {/* End #main */}
      {/* ======= Footer ======= */}
      <footer id="footer" className="footer">
        <div className="copyright">
          © Copyright <strong><span>Device Manager</span></strong>. All Rights Reserved
        </div>
      </footer>{/* End Footer */}
    </div >

  );
};

export default AdminDevices;
