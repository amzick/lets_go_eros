import React from 'react';
import { NavLink } from 'react-router-dom';

class SessionNavBar extends React.Component {

  render() {
    // <img src="https://www.logolynx.com/images/logolynx/6a/6ae1e4dd5837d09a8cd998dbc4ae9c26.jpeg" />
    return (
      <header className="splash-header">
        <div className="session-header-left">
          <NavLink to="/"><h1 className="logo-full">Lets Go Eros</h1></NavLink>
        </div>
      </header>

    )
  }
}

export default SessionNavBar;