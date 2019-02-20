import React from 'react';
import { connect } from 'react-redux';

import { createMessage } from '../../actions/message_actions';
import { closeModal } from '../../actions/modal_actions';
import { fetchUser } from '../../actions/user_actions';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id]
  });
};

const mdp = dispatch => {
  return ({
    createMessage: (message) => dispatch(createMessage(message)),
    closeModal: () => dispatch(closeModal()),
    fetchUser: (userID) => dispatch(fetchUser(userID)),
  });
};

class NewMessage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      recipient_id: props.recipient.id,
      submitClass: "invalid-submit",
      disabled: "disabled",
      submitValue: "Send!"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ message: event.target.value }, () => {
      if (this.state.message !== "") {
        this.setState({ submitClass: "valid-submit", disabled: "" });
      } else {
        this.setState({ submitClass: "invalid-submit", disabled: "disabled" });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const that = this;
    this.setState({ submitValue: "Sending...", disabled: "disabled", submitClass: "processing-submit" }, () => {
      this.props.createMessage({
        sender_id: this.props.currentUser.id,
        recipient_id: this.state.recipient_id,
        message: this.state.message
      }).then(resp => {
        this.props.fetchUser(this.props.currentUser.id);
        this.setState({ submitValue: "Sent!" }, () => {
          // hopefully refetching the currentUser updates the is messaging with ...

          setTimeout(that.props.closeModal, 500);
        });
      });
    });
  }

  render() {

    return (
      <div className="new-message-div">
        <h2>Send {this.props.recipient.fname} a message:</h2>
        <textarea placeholder="Be Nice..." value={this.state.message} onChange={this.handleChange} />
        <input type="submit" onClick={this.handleSubmit} className={this.state.submitClass} disabled={this.state.disabled} value={this.state.submitValue} />
      </div>
    )
  }
}

export default connect(msp, mdp)(NewMessage);