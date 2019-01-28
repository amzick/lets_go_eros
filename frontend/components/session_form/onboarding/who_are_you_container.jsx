import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import SessionNavBar from '../session_nav_bar';
import EmailForm from './email_form';
import PasswordForm from './password_form';

// switch between email and password containers

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

class WhoAreYou extends React.Component {

  constructor(props) {
    super(props);
    this.state = (props.field !== "password" ? { field: "email" } : { field: props.field });
    this.backFunction = this.backFunction.bind(this);
    this.handler = this.handler.bind(this);
  }

  // since the parent is rerendering based on the status of the children components,
  // I need to pass a function down that will change the state of the parent
  // https://stackoverflow.com/questions/35537229/how-to-update-parents-state-in-react
  handler(field) {
    this.setState({
      field
    });

  }


  backFunction(event) {
    event.preventDefault();
    this.setState({
      field: "email",
    });
  }

  render() {
    const { field } = this.state;
    const backArrow = (field === "email" ? <Link to="/"><i className="fas fa-angle-left"></i></Link> : <i onClick={this.backFunction} className="fas fa-angle-left"></i>);

    let ComponentToBeRendered;
    switch (field) {
      case "email":
        ComponentToBeRendered = <EmailForm handler={this.handler} />;
        break;
      case "password":
        
        ComponentToBeRendered = <PasswordForm newUser={this.props.newUser} handler={this.handler} />;
        break;
    }


    return (
      <div className="login-div">
        <SessionNavBar />
        <span className="center-form-span">
          <div className="dynamic-span-container-div">
            <span className="back-arrow">{backArrow}</span>
            <h2>About You</h2>
            {/* last div for spacing */}
            <div />
          </div>

          {ComponentToBeRendered}

        </span>
      </div>
    )
  }
}

export default connect(msp, mdp)(WhoAreYou);