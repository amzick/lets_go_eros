import React from 'react';
import { connect } from 'react-redux';

import DynamicInput from '../dynamic_input';
// import gender component
// import birthday component


const msp = state => {
  return {
    newUser: state.ui,
  };
};

const mdp = dispatch => {
  return {

  };
};

class OnboardingSwitcher extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.field = "tell";
    this.state.buttonText = "next";
    this.buttonFunction = this.buttonFunction.bind(this);
  }

  buttonFunction(event) {
    event.preventDefault();
    

    switch (this.state.field) {
      case "tell":
        this.setState({ field: "fname" });
        break;
      case "fname":
        this.setState({ field: "gender" });
        break;
      case "gender":
        this.setState({ field: "birthday" });
        break;
      case 'birthday':
        this.setState({ field: "location" });
        break;
      case 'location':
        break;
    }
  }

  render() {
    let component = <p>No component yet</p>;
    // action will dispatch action to update ui
    
    // button will be the same for all except location
    let button = <button className="valid-submit" onClick={this.buttonFunction}>{this.state.buttonText}</button>

    switch (this.props.formType) {
      case 'tell':
        break;
      case 'fname':
        //dynamic input
        //define action
        //define button
        component = <DynamicInput field="fname" newUser={this.props.newUser} action={action} button={button} placeholder="Eros" inputType="text" message="What's your first name?" />
        break;
      case 'gender':
        // new component
        break;
      case 'birthday':
        // new component
        break;
      case 'location':
        // dynamic input
        component = <DynamicInput field="location" newUser={this.props.newUser} action={action} button={button} placeholder="e.g. 10001" message="Where do you primarily live?" />
        break;
    }

    return (
      <div>{component}</div>
    )
  }
};

export default connect(msp, mdp)(OnboardingSwitcher);
