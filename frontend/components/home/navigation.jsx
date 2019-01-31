import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../actions/session_actions';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
};

const mdp = dispatch => {
  return ({
    logout: () => dispatch(logout()),
  });
};

class Navigation extends React.Component {
  render() {
    // <img src="https://www.logolynx.com/images/logolynx/6a/6ae1e4dd5837d09a8cd998dbc4ae9c26.jpeg" />
    const profilePictureLastIndex = this.props.currentUser.profile_pictures.length - 1;
    const profilePictureSrc = this.props.currentUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";

    return (
      <header className="navigation-header">

        <div className="nav-left">
          <NavLink to="/home"><h1 className="logo-short">lge</h1></NavLink>
          <NavLink to="/match">Browse Matches</NavLink>
        </div>

        <div className="nav-right">
          <span className="nav-right-icon"><i className="fas fa-heart"></i></span>
          <span className="nav-right-icon"><i className="fas fa-comments"></i></span>
          <NavLink to={"/profile"} className="nav-user-img"><img src={profilePictureSrc} alt="profile picture" /></NavLink>
          <button onClick={this.props.logout}>Sign Out</button>
        </div>


      </header>
    )
  }
}

export default connect(msp, mdp)(Navigation);