import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SessionNavBar from '../session_nav_bar';
import Landing from './landing';
import FnameForm from './fname_form';
import GenderForm from './gender_form';
import BirthdayForm from './birthday_form';
import LocationForm from './location_form';



const msp = state => {
  return {
    newUser: state.ui.newUser,
    field: state.ui.field,
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
    this.state.field = "landing";
    this.state.buttonText = "next";
    this.backFunction = this.backFunction.bind(this);
    this.handler = this.handler.bind(this);
    // this.handleSignUp = this.handleSignUp.bind(this);
  }

  handler(field) {
    this.setState({
      field
    });
  };

  backFunction(event) {
    event.preventDefault();

    switch (this.state.field) {
      case "landing":
        break;
      case "fname":
        this.setState({ field: "landing" });
        break;
      case "gender":
        this.setState({ field: "fname" });
        break;
      //race.....
      case "birthday":
        this.setState({ field: "gender" });
        break;
      case "birhday":
        this.setState({ field: "birthday" });
        break;
    }
  }

  handleSignUp(event) {
    event.preventDefault();
    
  }

  render() {
    const { field } = this.state;
    let backArrow = <i onClick={this.backFunction} className="fas fa-angle-left"></i>;
    let aboutYou = <h2>About You</h2>;
    let ComponentToBeRendered;

    switch (field) {
      case "landing":
        // determine the component to be rendered
        ComponentToBeRendered = <Landing handler={this.handler} />;
        // don't render  a back button from the landing
        backArrow = null;
        aboutYou = null;
        break;
      case "fname":
        // determine the component to be rendered
        ComponentToBeRendered = <FnameForm handler={this.handler} />
        // determine what field the back button renders

        break;
      case "gender":
        ComponentToBeRendered = <GenderForm handler={this.handler} />
        // determine the component to be rendered
        // determine what field the back button renders

        break;
      //race.....
      case "birthday":
        ComponentToBeRendered = <BirthdayForm handler={this.handler} />
        // determine the component to be rendered
        // determine what field the back button render
        break;
      case "location":
        ComponentToBeRendered = <LocationForm handler={this.handler} />
    }

    return (
      <div className="login-div">
        <SessionNavBar />
        <span className="center-form-span">
          <div className="dynamic-span-container-div">
            {backArrow ? <span className="back-arrow">{backArrow}</span> : null}
            {aboutYou ? aboutYou : null}
          </div>
          {ComponentToBeRendered}
          {/* <h2>Tell us about yourself</h2> */}
          {/* <p>So we can find people who like you for you.</p> */}
          {/* <OnboardingSwitcher formType={this.state.formType} /> */}
          {/* {(this.state.formType === "location" ? <button onClick={this.handleSignUp}>Sign Up!</button> : <button onClick={this.backFunction}>{this.state.buttonText}</button>)} */}
        </span>

      </div>
    )
  }
}

export default connect(msp, mdp)(OnboardingContainer);