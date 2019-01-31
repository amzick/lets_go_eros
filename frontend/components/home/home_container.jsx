import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';

import Navigation from './navigation';
import UserCard from './user_card';
import DiscoverySection from './discovery_section';


const msp = state => {

  return ({
    currentUser: state.entities.users[state.session.id],
    allUsers: state.entities.users,
  });
};

const mdp = dispatch => {
  return ({
    fetchUsers: () => dispatch(fetchUsers()),
  });
};

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.mounted = false;
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.setState({ mounted: true });
  }

  render() {

    const { allUsers } = this.props;
    //TODO: search queries
    const randomUsers = [];

    if (this.state.mounted && Object.keys(allUsers).length > 30) {
      for (let i = 0; i < 30; i++) {
        let allUsersLength = Object.keys(allUsers).length;
        let rand = Math.floor(Math.random() * (parseInt(Object.keys(allUsers)[allUsersLength - 1]) - parseInt(Object.keys(allUsers)[0]) + 1) + parseInt(Object.keys(allUsers)[0]));
        if (rand !== this.props.currentUser) {
          randomUsers.push(allUsers[rand]);
        }
      }
    }

    // radiohead
    const queryResult1 = [];
    // match > 90
    const queryResult2 = [];
    // random
    const queryResult3 = [];

    if (randomUsers.length > 0) {
      randomUsers.forEach((user, idx) => {

        if (user === undefined) {
          "do fucking nothing";
        } else if (user.summary !== null && user.summary.includes("Hearthstone")) {
          queryResult1.push(<UserCard key={idx} cardUser={user} />)
        } else if (user.match >= 90) {
          queryResult2.push(<UserCard key={idx} cardUser={user} />)
        } else  if (queryResult3.length < 9) {
          queryResult3.push(<UserCard key={idx} cardUser={user} />)
        }
      });
    }

    return (
      <div className="base">
        <Navigation />
        <div className="home-space-div" />
        <DiscoverySection search={true} header="Hearthstone" queryResult={queryResult1} />
        <DiscoverySection header={"Top Matches"} queryResult={queryResult2} />
        <DiscoverySection header="They're Also Extroverted" queryResult={queryResult3} />
        <p>Logged in as {this.props.currentUser.fname}.</p>
      </div>
    )
  }
}

export default connect(msp, mdp)(HomeContainer);