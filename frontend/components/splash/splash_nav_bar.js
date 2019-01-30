import React from 'react';
import { NavLink } from 'react-router-dom';

class SplashNavBar extends React.Component {

  render() {
    // to do make a fucking drop down menu for profile picture

    return (
      // <img src="https://www.logolynx.com/images/logolynx/6a/6ae1e4dd5837d09a8cd998dbc4ae9c26.jpeg" />
      <header className="splash-header">
        <div>
          <h1 className="logo-full">Lets Go Eros</h1>
        </div>

        <div className="splash-header-right-div">
          <p>Have an account?</p>
          <NavLink className="sign-in-link" to="/login">Sign In</NavLink>
        </div>
      </header>

    )
  }
}

export default SplashNavBar;