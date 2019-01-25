import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return {

  };
};

const mdp = dispatch => {
  return {

  };
};

class FakeButton extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const alertMessage = this.props.message || "Feature not implemented."
    alert(alertMessage);
  }



  render() {
    return (
      <button className={this.props.className} onClick={this.handleClick} >{this.props.value}</button>
    )
  }

}

export default FakeButton;