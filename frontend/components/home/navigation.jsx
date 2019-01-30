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

    return (
      <header className="navigation-header">

        <div className="nav-left">
          <NavLink to="/home"><h1 className="logo-short">lge</h1></NavLink>
          <NavLink to="/match">Browse Matches</NavLink>
        </div>

        <div className="nav-right">
          <span className="nav-right-icon"><i className="fas fa-heart"></i></span>
          <span className="nav-right-icon"><i className="fas fa-comments"></i></span>
          <NavLink to={`/users/${this.props.currentUser.id}`} className="nav-user-img"><img src="https://i.pinimg.com/originals/ba/a5/39/baa5390576b803e1e08c6312efb05087.jpg" alt="profile picture" /></NavLink>
          <button onClick={this.props.logout}>Sign Out</button>
        </div>


      </header>
    )
  }
}

export default connect(msp, mdp)(Navigation);