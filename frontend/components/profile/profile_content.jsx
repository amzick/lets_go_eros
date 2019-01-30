import React from 'react';
import { connect } from 'react-redux';
import YouAndThem from './you_and_them';

const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
};

const mdp = dispatch => {
  return ({

  });
};

class ProfileContent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { pageUser } = this.props;

    return (
      <div className="profile-content">
        <div className="profile-content-2-3">
          <div className="profile-summary">
            Fetch the summary!
          </div>
          {pageUser.id === currentUser.id ? null : <YouAndThem />}
        </div>
        <div className="profile-content-1-3">
          <div className="profile-stats">
            {pageUser.birthday}
            {pageUser.location}
          </div>
          <div className="profile-answered-question">
            Questions will go here
          </div>
        </div>
      </div>
    )
  }
}

export default connect(msp, mdp)(ProfileContent);