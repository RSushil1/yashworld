import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container px-5">
            <a className="navbar-brand" href="#!">Device Manager</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
                <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
                <li className="nav-item"><a className="nav-link" href="#!">Services</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {/* Header*/}
        <header className="bg-dark py-5">
          <div className="container px-5">
            <div className="row gx-5 justify-content-center">
              <div className="col-lg-6">
                <div className="text-center my-5">
                  <h1 className=" fw-bolder text-white mb-2">Empower Your Business with Device Manager</h1>
                  <p className="lead text-white-50 mb-4">Unleash the full potential of your organization's device ecosystem with our state-of-the-art Device Manager. Streamline your operations by effortlessly handling devices across various platforms—Web, Android, and iOS. Create, edit, and delete devices with ease, ensuring optimal control over your technology infrastructure. </p>
                  <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                    <a className="btn btn-primary btn-lg px-4 me-sm-3" href="#features">Get Started</a>
                    <a className="btn btn-outline-light btn-lg px-4">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Features section*/}
        <section className="py-5 border-bottom" id="features">
          <div className="container px-5 my-5">
            <div className="row gx-5">
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-collection" /></div>
                <h2 className="h4 fw-bolder">Admin Authentication</h2>
                <p>The Admin Panel allows administrators to securely log in and out of their accounts. This fundamental feature ensures that only authorized individuals can access and manage the platform. A straightforward and secure authentication process contributes to a reliable and user-friendly experience.</p>

              </div>
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building" /></div>
                <h2 className="h4 fw-bolder">Dashboard Overview</h2>
                <p>The Dashboard module offers a quick glance at the latest activities by displaying the five most recent devices and users. This feature provides administrators with valuable insights at a glance, enabling them to stay informed about the system's current state and user activities without navigating through multiple sections.</p>

              </div>
              <div className="col-lg-4">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2" /></div>
                <h2 className="h4 fw-bolder">Devices and Users Management</h2>
                <p>The Devices and Users modules provide a comprehensive suite of tools for administrators to manage devices and users efficiently. In the Devices module, administrators can view a list of devices in a tabular format, create new devices with specified attributes, edit existing device details, and delete individual or multiple devices. Similarly, the Users module allows administrators to perform actions such as creating users, editing user details, and deleting users, either individually or in bulk.</p>
              </div>
            </div>
          </div>
        </section>
        {/* Footer*/}
        <footer className="py-5 bg-dark">
          <div className="container px-5"><p className="m-0 text-center text-white">Copyright © Device Manager 2024</p></div>
        </footer>
      </div>

    </>

  );
};

export default HomePage;
