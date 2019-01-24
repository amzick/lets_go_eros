import React from 'react';
import { logout } from '../../actions/session_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {

  render() {
    
    return (
      <div>
        <h1>Please  work</h1>
        <button onClick={this.props.logout}>Log Out Maybe who knows</button>
      </div>
    )

  }
}

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
  };
};


export default connect(msp, mdp)(Logout);