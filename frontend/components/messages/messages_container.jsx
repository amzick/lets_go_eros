import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../home/navigation';
import LoggedInFooter from '../home/logged_in_footer';
import MessageCard from './message_card';

import { fetchUser } from '../../actions/user_actions';
import { fetchUserMessages } from '../../actions/message_actions';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
    allUsers: state.entities.users,
  });
};

const mdp = dispatch => {
  
  return ({
    fetchUser: (userID) => dispatch(fetchUser(userID)),
    fetchUserMessages: (userID) => dispatch(fetchUserMessages(userID)),
  });
};

class MessagesContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users_loaded: 0,
    };
  }

  componentDidMount() {
    const that = this;
    currentUser.is_messaging_with.forEach(userID => {
      
      that.props.fetchUser(userID).then(() => {
        that.setState({ users_loaded: this.state.users_loaded+1 });
      });
    });
  }

  render() {

    let allThreads = [];
    if (currentUser.is_messaging_with.length !== 0 && this.state.users_loaded === currentUser.is_messaging_with.length) {
      currentUser.is_messaging_with.forEach((userID) => {
        allThreads.push(
          <MessageCard key={userID} cardUser={this.props.allUsers[userID]} />
        );
      });
    };

    return (
      <>
        <div className="base">
          <Navigation />
          <div className="messages-section">
            <h1>Messages</h1>
            <div className="threads-div">
              {allThreads.length > 0 ? allThreads : <p>You don't have any messages yet! Get Out there and start talking to people!</p>}
            </div>
          </div>
        </div>
        <LoggedInFooter />
      </>
    )
  }

}

export default connect(msp, mdp)(MessagesContainer);