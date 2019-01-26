import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import OnboardingSwitcher from './onboarding_switcher';
// import signup action

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

class OnboardingContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.formType = "tell";
    this.state.buttonText = "next";
    this.buttonFunction = this.buttonFunction.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  buttonFunction(event) {
    event.preventDefault();
    // the last step will be location

    switch (this.state.formType) {
      case "tell":
        this.setState({ formType: "fname", buttonText: "Set First Name" });
        break;
      case "fname":
        this.setState({ formType: "gender", buttonText: "Choose Genders" });
        break;
      case "gender":
        this.setState({ formType: "birthday", buttonText: "Select Birthdate" });
        break;
      case "birthday":
        this.setState({ formType: "location", buttonText: "Choose Location" });
        break;
    }
  }

  handleSignUp(event) {
    event.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <span>
          <h2>Tell us about yourself</h2>
          <p>So we can find people who like you for you.</p>
          <OnboardingSwitcher formType={this.state.formType} />
          {(this.state.formType === "location" ? <button onClick={this.handleSignUp}>Sign Up!</button> : <button onClick={this.buttonFunction}>{this.state.buttonText}</button>)}
        </span>

      </div>
    )
  }
}

export default connect(msp, mdp)(OnboardingContainer);