import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './NavBar.css';


const NavBar = () => {
    let nav =
    <div className="Nav">
        <NavLink className="link" exact to='/profile' ><img className="logo" src="https://i.imgur.com/bZJln44.png" alt="logo"/>
        </NavLink>
        <img src="https://i.imgur.com/E2h52me.png" alt="mood"/>
        <img src="https://i.imgur.com/Ht4u2x5.png" alt="chat"/>
        <img src="https://i.imgur.com/oxCHc4r.png" alt="add friend"/>
        <img className="setting" src="https://i.imgur.com/fwWZegV.png"  alt="setting"/>
    </div>

    // let nav =
    //     <div className="Nav">

            
    //         <NavLink className="link" exact to='/' >Home</NavLink>

    //         <NavLink className="link" exact to='/profile' >Profile</NavLink>
    //         {/* &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    //         <NavLink className="link" exact to='/chat' >Chat</NavLink> */}

    //     </div>

    return (
        <div className='NavBar'>
            {nav}
        </div>
    );
};

export default NavBar;
