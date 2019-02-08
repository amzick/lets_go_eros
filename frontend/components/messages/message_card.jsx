import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMessagesBetween } from '../../util/message_api_util';
import { fetchMessages } from '../../actions/message_actions';
import { openModal } from '../../actions/modal_actions';


const msp = (state, ownProps) => {
  return ({
    currentUser: state.session.id,
    cardUser: ownProps.cardUser,
    allMessages: ownProps.allMessages,
  });
};

const mdp = dispatch => {
  return ({
    fetchMessages: (array) => dispatch(fetchMessages(array)),
    openModal: (modalData) => () => dispatch(openModal("messagesThread", modalData))
  });
};

class MessageCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageIDsWithCurrentUser: [],
      messagesWithCurrentUser: [],
      cardMessages: ["Loading"],
      counter: 0,
    };
  }

  componentDidMount() {
    const that = this;
    fetchMessagesBetween(this.props.currentUser, this.props.cardUser.id).then((resp) => {
      that.setState({ messageIDsWithCurrentUser: resp.messages_between }, () => {
        that.props.fetchMessages(that.state.messageIDsWithCurrentUser).then(() => {
          const setMessages = [];
          that.state.messageIDsWithCurrentUser.forEach(id => {
            setMessages.push(this.props.allMessages[id]);
          });
          that.setState({ messagesWithCurrentUser: setMessages });
        });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allMessages !== this.props.allMessages) {

      this.setState({ allMessages: this.props.allMessages }, () => {

        this.forceUpdate();
      });
    }
  }

  render() {
    const { cardUser } = this.props;
    let profilePictureSrc;
    if (cardUser.bot_img_src) {
      profilePictureSrc = cardUser.bot_img_src;
    } else {
      const profilePictureLastIndex = cardUser.profile_pictures.length - 1;
      profilePictureSrc = cardUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";
    }

    // let cardMessages;
    if (this.state.messagesWithCurrentUser.length > 0) {

      this.state.cardMessages = this.state.messagesWithCurrentUser;
    } else {
      this.state.cardMessages = ["Loading"];
    }


    return (

      <div className="messagecard-div" onClick={this.props.openModal({ messages: this.state.cardMessages, userPicture: profilePictureSrc, cardUser: cardUser })} >
        <Link onClick={(event) => event.stopPropagation()} to={`/profiles/${cardUser.id}`}>
          <div className="messagecard-thumb">
            <img src={profilePictureSrc} />
          </div>
        </Link>
        <div className="messagecard-text">
          <div className="messagecard-text-header">
            <h2>{cardUser.fname}, {cardUser.age}</h2>
            <p>{this.state.cardMessages[0] === "Loading" ? "Loading" : this.state.cardMessages[0].sent_at}</p>
          </div>
          <div className="messagecard-text-content">
            {this.state.cardMessages[0] === "Loading" ? this.state.cardMessages[0] : this.state.cardMessages[0].message}
          </div>
        </div>
      </div>
    )


  }
}

export default connect(msp, mdp)(MessageCard);