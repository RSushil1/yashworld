import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-centre">
        <div className="list-group border border-info">
        <NavLink className="btn btn-info">User Menu ➡️</NavLink>
          <NavLink
            to="/dashboard/user"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
           Dashboard
          </NavLink>
        </div>
      </div>
      
    </>
  );
};

export default UserMenu;
