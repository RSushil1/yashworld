import React from "react";
import { UseAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";
const Dashboard = () => {
  const [auth] = UseAuth();
  return (
    <div className="container-flui m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <div className="card shadow mb-3" style={{ maxWidth: 540 }}>
            <div className="row g-0">
              <div className="col-md-4">
                <img src="..." className="img-fluid rounded-start" alt="..." />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Name: {auth?.user?.name}</h5>
                  <h5 className="card-title">Email: {auth?.user?.email}</h5>
                  <h5 className="card-title">Contacts: {auth?.user?.phone}</h5>
                  <h5 className="card-title">Address: {auth?.user?.address}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
