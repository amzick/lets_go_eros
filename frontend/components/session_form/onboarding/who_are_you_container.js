import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DynamicInput from '../dynamic_input';
import SessionNavBar from '../session_nav_bar';

// switch between email and password containers

const msp = state => {
  return {
    newUser: state.ui,
  };
};

const mdp = dispatch => {
  return {

  };
};

class WhoAreYou extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.field = "email";
    this.state.buttonText = "next";
    this.buttonFunction = this.buttonFunction.bind(this);
    // this.buttonText.bind(this);
  }

  buttonFunction(event) {

    event.preventDefault();
    console.log(this.state);

    switch (this.state.field) {
      case "email":
        this.setState({ field: "password", buttonText: "sign up" });
        break;
      case "password":
        this.setState({ field: "email", buttonText: "next" });
        break;
      default:
        break;
    }
  }

  // buttonText() {

  // }

  render() {


    const backArrow = (this.state.field === "email" ? <Link to="/"><i className="fas fa-angle-left"></i></Link> : <i onClick={this.buttonFunction} className="fas fa-angle-left"></i>);
    const action = (this.state.field === "email" ? (() => console.log("email")) : (() => console.log("password")));
    const button = (this.state.field === "email" ? <button className="valid-submit" onClick={this.buttonFunction}>{this.state.buttonText}</button> : <Link to="/onboarding"><button className="valid-submit">Tell Us More!</button></Link>);
    const placeholder = (this.state.field === "email" ? "your.email@example.com" : "6 characters minimum");
    const inputType = (this.state.field === "email" ? "text" : "password");
    const message = (this.state.field === "email" ? "Welcome! Who are you?" : "Create a password")

    return (
      <div className="login-div">
        <SessionNavBar />
        <span className="center-form-span">
          <div className="dynamic-span-container-div">
            <span>{backArrow}</span>
            <h2>About You</h2>
            {/* last div for spacing */}
            <div />
          </div>
          {/* switch between email and password */}
          <DynamicInput field={this.state.field} newUser={this.props.newUser} action={action} button={button} placeholder={placeholder} inputType={inputType} message={message} />
          {/* <button onClick={this.buttonFunction}>{this.state.buttonText}</button> */}

        </span>
      </div>
    )
  }
}

export default connect(msp, mdp)(WhoAreYou);