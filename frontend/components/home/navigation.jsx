import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

const msp = state => {
  return ({

  });
};

const mdp = dispatch => {
  return ({
    logout: () => dispatch(logout()),
  });
};

class Navigation extends React.Component {
  render() {
    return (
      <header className="navigation-header">

        <div className="nav-left">
          <img src="https://www.logolynx.com/images/logolynx/6a/6ae1e4dd5837d09a8cd998dbc4ae9c26.jpeg" />
          <NavLink to="/match">Browse Matches</NavLink>
        </div>

        <div className="nav-right">
          <i className="okicon i-messages"></i>
          <img alt="profile picture" />
          <button onClick={this.props.logout}>Sign Out</button>
        </div>


      </header>
    )
  }
}

export default connect(msp, mdp)(Navigation);