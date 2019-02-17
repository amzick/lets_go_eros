import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchMessagesBetween } from '../../util/message_api_util';
import { fetchMessages } from '../../actions/message_actions';
import { openModal } from '../../actions/modal_actions';


const msp = (state, ownProps) => {
  return ({
    currentUser: state.entities.users[state.session.id],
    cardUser: ownProps.cardUser,
    messages: ownProps.messages,
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
      messagesWithCurrentUser: ["Loading"],
      counter: 0,
    };
    
  }

  componentDidMount() {
    
    const {currentUser, cardUser} = this.props;
    const that = this;
    fetchMessagesBetween(currentUser.id,cardUser.id).then(resp => {
      this.setState({messageIDsWithCurrentUser: resp.messages_between}, () => {
        const setMessages = [];
        that.state.messageIDsWithCurrentUser.forEach(id => {
          setMessages.push(that.props.messages[id]);
        });
        that.setState({messagesWithCurrentUser: setMessages });
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages !== this.props.messages) {
    //   this.setState({ messages: this.props.messages }, () => {
      const {currentUser, cardUser } = this.props;
      const that = this;
      fetchMessagesBetween(currentUser.id, cardUser.id).then(resp => {
        that.setState({messageIDsWithCurrentUser: resp.messages_between}, () => {
          const newMessage = that.props.messages[resp.messages_between[0]];
           that.setState({messagesWithCurrentUser: [newMessage].concat(this.state.messagesWithCurrentUser)});
        });
      });
    //     this.forceUpdate();
    //   });
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

    
    return (

      <div className="messagecard-div" onClick={this.props.openModal({ messages: this.state.messagesWithCurrentUser, userPicture: profilePictureSrc, cardUser: cardUser })} >
        <Link onClick={(event) => event.stopPropagation()} to={`/profiles/${cardUser.id}`}>
          <div className="messagecard-thumb">
            <img src={profilePictureSrc} />
          </div>
        </Link>
        <div className="messagecard-text">
          <div className="messagecard-text-header">
            <h2>{cardUser.fname}, {cardUser.age}</h2>
            <p>{this.state.messagesWithCurrentUser[0] === "Loading" ? "Loading" : this.state.messagesWithCurrentUser[0].sent_at}</p>
          </div>
          <div className="messagecard-text-content">
            {this.state.messagesWithCurrentUser[0] === "Loading" ? this.state.messagesWithCurrentUser[0] : this.state.messagesWithCurrentUser[0].message}
          </div>
        </div>
      </div>
    )


  }
}

export default connect(msp, mdp)(MessageCard);