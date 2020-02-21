import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navigation.scss';
import logo from '../assets/i/blazelogo-blue.png'

export const Navigation = () => {
  return (
    <>
      <nav>
        <div className="logo">

        </div>
        <NavLink
          exact="true"
          to="/"
          className="navLink"
          activeClassName="active">Home</NavLink>
        <NavLink
          exact="true"
          to="/customers"
          className="navLink"
          activeClassName="active">Customers</NavLink>
      </nav>
      <div className="navSpacer" />
    </>
  )
}
