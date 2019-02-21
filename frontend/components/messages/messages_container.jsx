import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../home/navigation';
import LoggedInFooter from '../home/logged_in_footer';
import MessageCard from './message_card';
import LoadingComponent from '../loading/loading_component';


import { fetchUser, fetchUsers } from '../../actions/user_actions';
import { fetchUserMessages } from '../../actions/message_actions';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
    allUsers: state.entities.users,
    messages: state.entities.messages
  });
};

const mdp = dispatch => {

  return ({
    fetchUser: (userID) => dispatch(fetchUser(userID)),
    fetchUsers: (idsArray) => dispatch(fetchUsers(idsArray)),
    fetchUserMessages: (userID) => dispatch(fetchUserMessages(userID)),
  });
};

class MessagesContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usersLoaded: false,
      allThreads: [],
    };

  }

  componentDidMount() {
    this.props.fetchUserMessages(this.props.currentUser.id).then(() => {
      this.props.fetchUsers(this.props.currentUser.is_messaging_with).then(() => {
        this.setState({ usersLoaded: true });
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (Object.entries(prevProps.messages).length !== Object.entries(this.props.messages).length) {
      ("messages container props changed");
    }
  }

  render() {

    const { currentUser } = this.props;

    let componentToRender;
    let allThreads = [];
    if (this.state.usersLoaded) {
      if (currentUser.is_messaging_with.length > 0) {
        currentUser.is_messaging_with.forEach((userID) => {
          allThreads.push(
            <MessageCard key={userID} cardUser={this.props.allUsers[userID]} messages={this.props.messages} />
          );
        });
        componentToRender = allThreads;
      } else {
        componentToRender = <p>You don&#39;t have any messages yet! Get Out there and start talking to people!</p>
      };
    };

    return (
      <>
        <div className="base">
          <Navigation />
          <div className="messages-section">
            <h1>Messages</h1>
            <div className="threads-div">
              {this.state.usersLoaded ? componentToRender : <LoadingComponent />}
            </div>
          </div>
        </div>
        <div className = "push" />
        <LoggedInFooter />
      </>
    )
  }

}

export default connect(msp, mdp)(MessagesContainer);