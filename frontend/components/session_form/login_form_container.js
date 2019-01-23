import React from 'react';
import { connect } from 'react-redux';
import { login, RECEIVE_SESSION_ERRORS } from '../../actions/session_actions';



const msp = state => {
  return {
    errors: state.errors.session,
    formType: "Log In",
    currentUser: state.entities.users[state.session.id],
    user: { email: "", password: "" },
  };
};

const mdp = dispatch => {

  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch({ type: RECEIVE_SESSION_ERRORS, errors: [] }),
  };
};

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  handleChange(field) {
    return (event) => {
      this.setState({
        [field]: event.target.value
      });
    };
  }

  render() {

    const { formType } = this.props;
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>{formType}

        <label>Email:
          <input type="text" value={email} onChange={this.handleChange("email")} placeholder="Email" />
        </label>

        <label>Password:
          <input type="password" value={password} onChange={this.handleChange("password")} placeholder="Password" />
        </label>

        <input type="submit" value={formType} />

      </form >
    );
  }

}

export default connect(msp, mdp)(LoginForm);
