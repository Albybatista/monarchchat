import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';


const NavBar = () => {
    let nav =


        <div className="Nav">

            <NavLink className="link" exact to='/' >Home</NavLink>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link className="link" exact to='/profile' >Profile</Link>

        </div>


    return (
        <div className='NavBar'>
            {nav}
        </div>
    );
};

export default NavBar;