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
                <h2 className="h4 fw-bolder">Featured title</h2>
                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <a className="text-decoration-none" href="#!">
                  Call to action
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
              <div className="col-lg-4 mb-5 mb-lg-0">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-building" /></div>
                <h2 className="h4 fw-bolder">Featured title</h2>
                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <a className="text-decoration-none" href="#!">
                  Call to action
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
              <div className="col-lg-4">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-toggles2" /></div>
                <h2 className="h4 fw-bolder">Featured title</h2>
                <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                <a className="text-decoration-none" href="#!">
                  Call to action
                  <i className="bi bi-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Footer*/}
        <footer className="py-5 bg-dark">
          <div className="container px-5"><p className="m-0 text-center text-white">Copyright © Your Website 2023</p></div>
        </footer>
      </div>

    </>

  );
};

export default HomePage;
