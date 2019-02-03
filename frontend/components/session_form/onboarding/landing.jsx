import React from 'react';
import { connect } from 'react-redux';

import { updateField } from '../../../actions/ui_actions';

const msp = state => {
  return ({
    errors: state.errors.ui,
    newUser: state.ui.newUser,
  });
};

const mdp = dispatch => {
  return ({
    updateField: (field) => dispatch(updateField(field)),
  });
};

class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handler("fname");
    this.props.updateField("fname");
  }

  render() {

    return (
      <div>
        <div className="landing-speech-bubble">
          <h2>Tell us about yourself</h2>
          <p>So we can find people who like you for you.</p>
          <div className="landing-speech-bubble-point" >""</div>
        </div>
        <img className="landing-img" src="https://s3.amazonaws.com/letsgoeros-dev/01_img.png" />
        <div>
          <div className="landing-bottom-div">
            <button onClick={this.handleSubmit} className="valid-submit">Next</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(msp, mdp)(Landing);