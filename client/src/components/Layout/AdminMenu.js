import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-centre">
        <div className="list-group border border-info">
        <NavLink className="btn btn-info">Admin Menu ➡️</NavLink>
          <NavLink
            to="/dashboard/admin"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
           Dashboard
          </NavLink>
          <NavLink to="/dashboard/admin/devices" className="list-group-item list-group-item-action">
            Divices
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Users
          </NavLink>
        </div>
      </div>
      
    </>
  );
};

export default AdminMenu;
