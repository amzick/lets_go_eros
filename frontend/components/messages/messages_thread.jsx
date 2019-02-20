import React from 'react';
import { connect } from 'react-redux';

import MessageIndexItem from './message_index_item';

import {  fetchMessage } from '../../actions/message_actions';
import { createMessage } from '../../util/message_api_util';
import { closeModal } from '../../actions/modal_actions';


const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
};

const mdp = dispatch => {
  // createMessage: (message) => dispatch(createMessage(message)),
  return ({
    closeModal: () => dispatch(closeModal()),
    fetchMessage: (messageID) => dispatch(fetchMessage(messageID)),
  });
};

class MessagesThread extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitClass: "mini-invalid-submit",
      disabled: 'disabled',
      reply: "",
      submitValue: "Reply!"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ reply: event.target.value }, () => {
      if (this.state.reply !== "") {
        this.setState({ submitClass: "mini-valid-submit", disabled: "" });
      } else {
        this.setState({ submitClass: "mini-invalid-submit", disabled: "disabled" });
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const that = this;
    

    this.setState({ submitValue: "Sending...", disabled: "disabled", submitClass: "mini-processing-submit" }, () => {
      createMessage({
        sender_id: this.props.currentUser.id,
        recipient_id: this.props.cardUser.id,
        message: this.state.reply
      }).then(resp => {
        
        that.props.fetchMessage(resp.id).then(() => {
          this.setState({ submitValue: "Sent!" }, () => {
            setTimeout(that.props.closeModal, 500);
          });
        });
      });
    });
  }

  render() {

    const { currentUser } = this.props;

    let profilePictureSrc;
    if (currentUser.bot_img_src) {

      profilePictureSrc = currentUser.bot_img_src;
    } else {
      const profilePictureLastIndex = currentUser.profile_pictures.length - 1;
      profilePictureSrc = currentUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";
    }


    const messages = this.props.messages.map((message) => {
      return <MessageIndexItem key={message.id} message={message.message} sender_id={message.sender_id} userPicture={this.props.userPicture} currentUser={this.props.currentUser} currentUserPicture={profilePictureSrc} sent_at={message.sent_at} />;
    });


    return (
      <div className="messages-thread-div">
        <h2>Messages with {this.props.cardUser.fname}:</h2>
        <ul className="messages-thread">
          <textarea placeholder="Reply?" value={this.state.reply} onChange={this.handleChange} />
          <input type="submit" className={this.state.submitClass} onClick={this.handleSubmit} disabled={this.state.disabled} value={this.state.submitValue} />
          {messages}
        </ul>
      </div>
    )
  }
}

export default connect(msp, mdp)(MessagesThread);