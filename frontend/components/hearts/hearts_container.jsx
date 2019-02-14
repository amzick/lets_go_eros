import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../home/navigation';
import LoggedInFooter from '../home/logged_in_footer';

import { fetchUsers } from '../../actions/user_actions';
import { fetchUserHeartsArray } from '../../util/heart_api_util';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
    users: state.entities.users
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
      usersFetched:false,
    };
    // next steps:
    // get those into an array, fetch those users
    // split those users into matches, crushes, and admirer arrays
    // render discovery things for each
  }

  componentDidMount() {
    const that = this;
    fetchUserHeartsArray(this.props.currentUser.id).then(resp => {
      that.props.fetchUsers(resp.hearts).then( () => {
        that.setState({usersFetched:true});
      });
    });
  }



  render() {

    return (
      <>
        <div className="base">
          <Navigation />
          <div className="home-space-div" />
          {this.state.usersFetched ? <p>Loaded</p> : <p>Loading...</p>}
        </div>
      </>
    );
  }
}

export default connect(msp,mdp)(HeartsContainer);