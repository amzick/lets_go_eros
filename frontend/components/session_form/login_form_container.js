import React from 'react';
import { connect } from 'react-redux';
import { login, clearErrors } from '../../actions/session_actions';
//components
import RenderErrors from '../errors/render_errors';
import FakeButton from '../errors/fake_button';
import SessionNavBar from './session_nav_bar';


const msp = state => {
  return {
    errors: state.errors.session,
    formType: "Sign In",
    currentUser: state.entities.users[state.session.id],
    user: { email: "", password: "" },
  };
};

const mdp = dispatch => {

  return {
    login: (user) => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
  };
};

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { newUser: props.user };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state.submitClass = "invalid-submit";
    this.state.disabled = "disabled";
    this.demo = this.demo.bind(this);
  }



  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state.newUser).then(this.props.clearErrors);
  }

  demo(event) {
    event.preventDefault();
    // todo : not me!!!
    const demoUser = { email: "aaron.zick@gmail.com", password: 'password' };
    this.props.login(demoUser).then(this.props.clearErrors);
  }

  handleChange(field) {
    // TODO : show errors in real time
    return (event) => {
      const setUser = this.state.newUser;
      setUser[field] = event.target.value;
      this.setState({
        newUser: setUser
      }, () => {
        if (this.state.newUser.email === "" || this.state.newUser.password === "") {
          this.setState({ disabled: "disabled", submitClass: "invalid-submit" });
        } else {

          this.setState({ disabled: "", submitClass: "valid-submit" });

        }
      });
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  render() {

    const { formType } = this.props;
    const { email, password } = this.state;

    return (
      <div className="login-div">

        <SessionNavBar />
        <span className="center-form-span" >

          <h2>{formType}</h2>
          <span className="form-emoji-span" role="img">👋</span>

          <form className="session-form" onSubmit={this.handleSubmit}>

            <label><span>Email</span>
              <input className="session-form-input" type="text" value={email} onChange={this.handleChange("email")} placeholder="Email" />
            </label>

            <label><span>Password</span>
              <input className="session-form-input" type="password" value={password} onChange={this.handleChange("password")} placeholder="Password" />
            </label>

            {/* <FakeButton className="forgot-password" value="Forgot password?" message="Unfortunately you're better off creating a new account until I implement email validation. Sorry!" /> */}

            <RenderErrors errors={this.props.errors} />
            <input className={this.state.submitClass} type="submit" value={formType} disabled={this.state.disabled} />
            <button className="demo-signin" onClick={this.demo}>Sign in with a demo user</button>



          </form >

        </span>
      </div>
    );
  }

}

export default connect(msp, mdp)(LoginForm);
