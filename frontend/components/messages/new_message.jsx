import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return ({
    // modalData: state.ui.modalData,
  });
};

const mdp = dispatch => {
  return({

  });
};

class NewMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      recipient_id: props.recipient.id,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({message: event.target.value});
  }

  render() {
    
    return (
      <div>
        <h2>Send {this.props.recipient.fname} a message:</h2>
        <textarea placeholder="Be Nice..." value={this.state.message} onChange={this.handleChange}/>
        <input type="submit" />
      </div>
    )
  }
}

export default connect(msp,mdp)(NewMessage);