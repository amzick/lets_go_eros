import React from 'react';
import { connect } from 'react-redux';
import { fetchMessagesBetween } from '../../util/message_api_util';
import { fetchMessages } from '../../actions/message_actions';

const msp = state => {
  return({
    currentUser: state.session.id,
    
  });
};

const mdp = dispatch => {
  return({
    fetchMessages: (array) => dispatch(fetchMessages(array)),
  });
};

class MessageCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageIDsWithCurrentUser: [],
      messagesWithCurrentUser: [],
    };
  }

  componentDidMount() {
    const that = this;
    fetchMessagesBetween(this.props.currentUser,this.props.cardUser.id).then((resp) => {
      that.setState({messageIDsWithCurrentUser: resp.messages_between}, () => {
        that.props.fetchMessages(that.state.messageIDsWithCurrentUser).then( () => {
          const setMessages = [];
          that.state.messageIDsWithCurrentUser.forEach(id => {
            setMessages.push(this.props.allMessages[id]);
          });
          that.setState({messagesWithCurrentUser: setMessages});
        });
      });
    });
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

    let cardMessages;
    if (this.state.messagesWithCurrentUser.length > 0) {
      
      cardMessages = this.state.messagesWithCurrentUser;
    } else {
      cardMessages = ["Loading"];
    }

    return (

      <div className="messagecard-div">
        <div className="messagecard-thumb">
          <img src={profilePictureSrc} />
        </div>
        <div className="messagecard-text">
          <div className="messagecard-text-header">
            <h2>{cardUser.fname}, {cardUser.age}</h2>
            <p>{cardMessages[0] === "Loading" ? "Loading" : cardMessages[0].sent_at}</p>
          </div>
          <div className="messagecard-text-content">
            {cardMessages[0] === "Loading" ? cardMessages[0] : cardMessages[0].message}
          </div>
        </div>
      </div>
    )


  }
}

export default connect(msp,mdp)(MessageCard);