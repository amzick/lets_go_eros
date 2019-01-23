import React from 'react';
import { NavLink } from 'react-router-dom';

class SplashNavBar extends React.Component {

  render() {
    return (
      <header>
        <img src="https://www.logolynx.com/images/logolynx/6a/6ae1e4dd5837d09a8cd998dbc4ae9c26.jpeg" />
        <div>Nav Bar</div>
        <NavLink to="/onboarding">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </header>

    )
  }
}

export default SplashNavBar;