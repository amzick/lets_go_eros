import React from 'react';
import { connect } from 'react-redux';
import Navigation from '../home/navigation';
import LoggedInFooter from '../home/logged_in_footer';

import { fetchUsers } from '../../actions/user_actions';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id]
  });
};

const mdp = dispatch => {
  return ({
  });
};

class HeartsContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <div className="base">
          <Navigation />
          <div className="home-space-div" />
          <p>Thisll be the hearts container.</p>
        </div>
      </>
    );
  }
}

export default HeartsContainer;