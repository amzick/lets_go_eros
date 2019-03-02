import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser, fetchLocalUsers } from '../../actions/user_actions';
import { fetchDistance, fetchDistances } from '../../actions/distance_actions';
// import { fetchFirstLast } from '../../util/user_api_util';

import Navigation from './navigation';
import UserCard from './user_card';
import DiscoverySection from './discovery_section';
import LoggedInFooter from './logged_in_footer';
import LoadingComponent from '../loading/loading_component';



const msp = state => {

  return ({
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users,
    distances: state.distances
  });
};

const mdp = dispatch => {
  return ({
    // fetchUsers: (idsArray) => dispatch(fetchUsers(idsArray)),
    // fetchUser: (userID) => dispatch(fetchUser(userID)),
    fetchLocalUsers: (userID, maxResultSize = 40, radius = 500) => dispatch(fetchLocalUsers(userID, maxResultSize, radius)),
    // fetchDistance: (currentUser, user2) => dispatch(fetchDistance(currentUser, user2)),
    fetchDistances: (currentUser, usersArray) => dispatch(fetchDistances(currentUser, usersArray)),
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
    const { currentUser, fetchLocalUsers, fetchDistances } = this.props;
    fetchLocalUsers(currentUser.id, 50).then((resp) => {
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.users !== this.props.users) {
      // get the distances
      // .then to boost the counter
      // if counter is same as users size proceed
      const { users, currentUser } = this.props;
      this.props.fetchDistances(currentUser, Object.values(users)).then(() => {

        // Object.keys(users).forEach(userID => {
        //   this.props.fetchDistance(currentUser, users[userID]);
        // });


      });
    }

    if (prevProps.distances !== this.props.distances) {
      const { users, currentUser, distances } = this.props;

      let distSum = 0;
      Object.values(distances).forEach(set => distSum += set.size);

      if (distSum >= Object.entries(users).length - 1) {
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
              case (currentUser.interests && user.interests && user.interests.includes(randomInterest)):
                if (queryTwo.size < 8) queryTwo.add(<UserCard key={user.id} cardUser={user} />);
                break;
              case (distances[2] && distances[5] && (distances[2].has(user.id) || distances[5].has(user.id))):
                // case (user.match < 80)
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

    let componentToRender = <LoadingComponent />
    if (this.state.usersLoaded) {
      componentToRender = (
        <>
          {this.props.currentUser.interests ? <DiscoverySection search={false} header={`They're also interested in ${this.state.interestQuery}`} queryResult={this.state.queryTwo} /> : <div className="discovery-section"><h1>Mutual Interests</h1><div className="discovery-empty-results-div">Update your profile with some interests and we'll find users that share them!</div></div>}
          {this.state.queryOne.size > 0 ? <DiscoverySection header={"Top Matches"} queryResult={this.state.queryOne} /> : null}
          {this.state.queryThree.size > 0 ? <DiscoverySection header="Users Within Five Miles" queryResult={this.state.queryThree} /> : null}
        </>
      );
    }

    return (
      <>
        <div className="base">
          <Navigation />
          <div className="home-space-div" />
          {/* <DiscoverySection search={false} header={`They're also interested in ${this.state.interestQuery}`} queryResult={this.state.queryTwo} />
          <DiscoverySection header={"Top Matches"} queryResult={this.state.queryOne} />
          <DiscoverySection header="Also Nearby" queryResult={this.state.queryThree} /> */}
          {componentToRender}
        </div>
        <div className="push" />
        <LoggedInFooter />
      </>
    )
  }
}

export default connect(msp, mdp)(HomeContainer);