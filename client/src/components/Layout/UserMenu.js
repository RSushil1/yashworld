import React from 'react'
import { NavLink } from 'react-router-dom'


const UserMenu = () => {
  return (
    <>
    <div className="text-centre">
      <div className="list-group border border-info">
        <NavLink className="btn btn-info" to="/dashboard/user">Dashboard ➡️</NavLink>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          Update Profile
        </NavLink>
        <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
          Orders
        </NavLink>
      </div>
    </div>
  </>
  )
}

export default UserMenu
