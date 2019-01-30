import React from 'react';
import { connect } from 'react-redux';
// import Profile from './profile';
import Navigation from '../home/navigation';
import ProfileHeader from './profile_header';
import ProfileContent from './profile_content';

const msp = (state, ownProps) => {
  const id = ownProps.match.params.id || state.session.id;
  return {
    currentUser: state.entities.users[state.session.id],
    pageUser: state.entities.users[id] || {},
  };
};

const mdp = (dispatch, ownProps) => {
  return {

  };
};

class ProfileContainer extends React.Component {

  componentDidMount() {
    // this.props.fetchUser(this.props.pageUser.id);
    // fetch user location info
    // fetch user age using birthday
    // fetch user summary; if empty create one
    // fetch match percentage with user here
  }

  render() {
    const { pageUser } = this.props;
    return (
      <div className="base">
      profile container for {this.props.pageUser.fname}
        <Navigation />
        <ProfileHeader pageUser={pageUser} />
        <ProfileContent pageUser={pageUser} />
      </div>
    )
  }
}

export default connect(msp, mdp)(ProfileContainer);