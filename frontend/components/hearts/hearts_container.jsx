import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../home/navigation';
import LoggedInFooter from '../home/logged_in_footer';
import UserCard from '../home/user_card';
import DiscoverySection from '../home/discovery_section';

import { fetchUsers } from '../../actions/user_actions';
import { fetchUserHeartsArray } from '../../util/heart_api_util';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
    userIDs: Object.keys(state.entities.users),
  });
};

const mdp = dispatch => {
  return ({
    fetchUsers: (idsArray = null) => dispatch(fetchUsers(idsArray)),
  });
};

class HeartsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usersFetched: false,
      matches: {},
      crushes: {},
      admirers: {},

    };
    // next steps:
    // get those into an array, fetch those users
    // split those users into matches, crushes, and admirer arrays
    // render discovery things for each
  }

  componentDidMount() {
    const that = this;
    fetchUserHeartsArray(this.props.currentUser.id).then(resp => {
      that.props.fetchUsers(resp.hearts).then(() => {
        that.setState({ usersFetched: true });
      });
    });
  }



  render() {

    const { currentUser, users, userIDs } = this.props;

    if (this.state.usersFetched) {
      userIDs.forEach(userID => {
        const user = users[userID];
        if (user.is_crush && user.is_admirer) {
          this.state.matches[user.id] = <UserCard key={user.id} cardUser={user} />;
        } else if (user !== currentUser && user.is_crush) {
          this.state.crushes[user.id] = <UserCard key={user.id} cardUser={user} />;
        } else if (user !== currentUser && user.is_admirer) {
          this.state.admirers[user.id] = <UserCard key={user.id} cardUser={user} />;
        }
      });
    }
    const componentsToRender = (
      <div>
        {Object.entries(this.state.matches).length > 0 ? <DiscoverySection header="Matches" queryResult={Object.values(this.state.matches)} /> : <div className="discovery-section"><h1>No Matches</h1></div>}
        {Object.entries(this.state.crushes).length > 0 ? <DiscoverySection header="Crushes" queryResult={Object.values(this.state.crushes)} /> : <div className="discovery-section"><h1>No Crushes</h1> </div>}
        {Object.entries(this.state.admirers).length > 0 ? <DiscoverySection header="Admirers" queryResult={Object.values(this.state.admirers)} /> : <div className="discovery-section"><h1>No Admirers</h1>:-(</div>}
      </div>
    )


    return (
      <>
        <div className="base">
          <Navigation />
          <div className="home-space-div" />
          {this.state.usersFetched ? componentsToRender : <p>Loading...</p>}
        </div>
        <LoggedInFooter />
      </>
    );
  }
}

export default connect(msp, mdp)(HeartsContainer);