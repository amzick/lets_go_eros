import React from 'react';
import { connect } from 'react-redux';
import { login, RECEIVE_SESSION_ERRORS } from '../../actions/session_actions';


const msp = state => {
  return {
    errors: state.errors.session,
    formType: "Sign In",
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    clearErrors: () => dispatch({ type: RECEIVE_SESSION_ERRORS, errors: [] }),
  };
};

class LoginForm extends React.Component {

  render() {
    return (
      <form>
        
      </form>
    );
  }

}

export default connect(msp, mdp)(LoginForm);
