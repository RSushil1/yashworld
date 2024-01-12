import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-centre">
        <div className="list-group border border-info">
        <NavLink className="btn btn-info" to="/dashboard/admin">Admin Menu ➡️</NavLink>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-products" className="list-group-item list-group-item-action">
            Create Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
