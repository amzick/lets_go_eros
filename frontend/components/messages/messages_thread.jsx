import React from 'react';
import { connect } from 'react-redux';

import { createMessage } from '../../actions/message_actions';
import { closeModal } from '../../actions/modal_actions';
import MessageIndexItem from './message_index_item';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
};

const mdp = dispatch => {
  return ({
    createMessage: (message) => dispatch(createMessage(message)),
    closeModal: () => dispatch(closeModal())
  });
};

class MessagesThread extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

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
          {messages}
        </ul>
      </div>
    )
  }
}

export default connect(msp, mdp)(MessagesThread);