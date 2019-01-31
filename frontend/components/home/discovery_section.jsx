import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';

import DiscoverySearch from './discovery_search';
import UserCard from './user_card';

const msp = state => {
  return ({
    allUsers: state.entities.users,
  });
};

const mdp = dispatch => {
  return ({
    fetchUsers: () => dispatch(fetchUsers()),
  });
};

class DiscoverySection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.mounted = false;
  }

  componentDidMount() {
    console.log("mounting discovery section");
    this.props.fetchUsers().then(() => console.log('users fetched'));
    this.setState({ mounted: true });
    //todo -> get fetch users to get location at same time

  }

  render() {
    // todo: fetch actual users
    const { allUsers } = this.props;
    const randomUsers = [];
    if (this.state.mounted) {
      for (let i = 0; i < 30; i++) {
        const rand = Math.floor(Math.random() * (1512 - 1295 + 1) + 1295);
        randomUsers.push(allUsers[rand]);
      }
    }

    const queryResult1 = [];
    const queryResult2 = [];
    const queryResult3 = [];

    if (randomUsers.length > 0) {
      randomUsers.forEach((user, idx) => {

        if (user === undefined) {
          "do fucking nothing";
        } else if (idx < 10) {
          queryResult1.push(<UserCard key={idx} cardUser={user} />)
        } else if (idx < 20) {
          queryResult2.push(<UserCard key={idx} cardUser={user} />)
        } else {
          queryResult3.push(<UserCard key={idx} cardUser={user} />)
        }
      });
    }

    return (
      <>
        <div className="discovery-section" >
          {this.props.search ? <DiscoverySearch /> : null}
          <h1>Get H from props</h1>
          <div className="usercard-row">{queryResult1}</div>
        </div>
        <div className="discovery-section-fader" />
      </>
    );
  }
}

export default connect(msp, mdp)(DiscoverySection);