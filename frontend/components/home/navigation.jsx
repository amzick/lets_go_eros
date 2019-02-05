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
    const { currentUser } = this.props;
    let profilePictureSrc;

    if (currentUser.bot_img_src) {
      
      profilePictureSrc = currentUser.bot_img_src;
    } else {
      const profilePictureLastIndex = currentUser.profile_pictures.length - 1;
      profilePictureSrc = currentUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";
    }

    return (
      <header className="navigation-header">

        <div className="nav-left">
          <NavLink to="/home"><h1 className="logo-short">lge</h1></NavLink>
          <NavLink to="/match">Browse Matches</NavLink>
        </div>

        <div className="nav-right">
          <span className="nav-right-icon"><i className="fas fa-heart"></i></span>
          <NavLink to="/messages"><span className="nav-right-icon"><i className="fas fa-comments"></i></span></NavLink>
          <NavLink to={"/profile"} className="nav-user-img"><img src={profilePictureSrc} alt="profile picture" /></NavLink>
          <button onClick={this.props.logout}>Sign Out</button>
        </div>


      </header>
    )
  }
}

export default connect(msp, mdp)(Navigation);