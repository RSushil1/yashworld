import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import { UseAuth } from "../../context/auth";
import Layout from "../../components/Layout/Layout";

const AdminDashboard = () => {
  const [auth] = UseAuth();

  return (
    <Layout>
      <div className="container dashboard ms-auto m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75">
                <h3>Admin Name : {auth?.user?.name}</h3>
                <h3>Email : {auth?.user?.email}</h3>
                <h3>Contact : {auth?.user?.phone}</h3>
                <h3>Address : {auth?.user?.address}</h3>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;