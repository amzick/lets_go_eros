import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, fetchLocalUsers } from '../../actions/user_actions';
// import { fetchFirstLast } from '../../util/user_api_util';

import Navigation from './navigation';
import UserCard from './user_card';
import DiscoverySection from './discovery_section';
import LoggedInFooter from './logged_in_footer';


const msp = state => {

  return ({
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
  });
};

const mdp = dispatch => {
  return ({
    // fetchUsers: (idsArray) => dispatch(fetchUsers(idsArray)),
    // fetchUser: (userID) => dispatch(fetchUser(userID)),
    fetchLocalUsers: (userID, maxResultSize = 40, radius = 500) => dispatch(fetchLocalUsers(userID, maxResultSize, radius)),
  });
};

class HomeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usersLoaded: false,
      interestQuery: "",
      queryOne: new Set(),
      queryTwo: new Set(),
      queryThree: new Set(),
    };
    // this.state.firstID = null;
    // this.state.lastID = null;
  }



  componentDidMount() {
    this.setState({ usersLoaded: false });
    const { currentUser, fetchLocalUsers } = this.props;
    fetchLocalUsers(currentUser.id, 18);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      const { users, currentUser } = this.props;
      let queryOne = new Set();
      let queryTwo = new Set();
      let queryThree = new Set();
      let randomInterest = this.state.interestQuery;
      if (currentUser.interests) {
        randomInterest = currentUser.interests.split(" ")[Math.floor(Math.random() * (currentUser.interests.split(" ").length))];
      }
      Object.values(users).forEach(user => {
        if (user !== this.props.currentUser) {
          switch (true) {
            case (user.match >= 80):
              if (queryOne.size < 8) queryOne.add(<UserCard key={user.id} cardUser={user} />);
              break;
            case (user.interests && user.interests.includes(randomInterest)):
              if (queryTwo.size < 8) queryTwo.add(<UserCard key={user.id} cardUser={user} />);
              break;
            case (user.match < 80):
              if (queryThree.size < 8) queryThree.add(<UserCard key={user.id} cardUser={user} />);
              break;
            default:
              break;
          }
        }
      });
      this.setState({ usersLoaded: true, queryOne, queryTwo, queryThree, interestQuery: randomInterest });
    }

  }

  render() {

    // const { users } = this.props;
    // //TODO: search queries
    // const randomUsers = [];

    // // refactoring
    // if (this.state.usersLoaded && Object.keys(users).length > 30) {
    //   for (let i = 0; i < 30; i++) {
    //     let usersLength = Object.keys(users).length;
    //     let rand = Math.floor(Math.random() * (parseInt(Object.keys(users)[usersLength - 1]) - parseInt(Object.keys(users)[0]) + 1) + parseInt(Object.keys(users)[0]));
    //     if (rand !== this.props.currentUser) {
    //       randomUsers.push(users[rand]);
    //     }
    //   }
    // }

    // // hearthstone. will be searchable
    // const queryResult1 = [];
    // // match > 90
    // const queryResult2 = [];
    // // random
    // const queryResult3 = [];

    // // refactoring
    // if (randomUsers.length > 0) {
    //   randomUsers.forEach((user, idx) => {

    //     if (user === undefined) {
    //       "do fucking nothing";
    //     } else if (user.summary !== null && user.summary.includes("Hearthstone")) {
    //       queryResult1.push(<UserCard key={idx} cardUser={user} />)
    //     } else if (user.match >= 80) {
    //       queryResult2.push(<UserCard key={idx} cardUser={user} />)
    //     } else if (queryResult3.length < 9) {
    //       queryResult3.push(<UserCard key={idx} cardUser={user} />)
    //     }
    //   });
    // }

    return (
      <div className="base">
        <Navigation />
        <div className="home-space-div" />
        <DiscoverySection search={false} header={`They're also interested in ${this.state.interestQuery}`} queryResult={this.state.queryTwo} />
        <DiscoverySection header={"Top Matches"} queryResult={this.state.queryOne} />
        <DiscoverySection header="Also Nearby" queryResult={this.state.queryThree} />
        <LoggedInFooter />
      </div>
    )
  }
}

export default connect(msp, mdp)(HomeContainer);