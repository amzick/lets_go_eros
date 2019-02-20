import React from 'react';
import { connect } from 'react-redux';

import { fetchUser, fetchGenders, fetchEthnicities } from '../../actions/user_actions';

import Navigation from '../home/navigation';
import ProfileHeader from './profile_header';
import ProfileContent from './profile_content';
import LoggedInFooter from '../home/logged_in_footer';


const msp = (state, ownProps) => {
  const id = parseInt(ownProps.match.params.id) || state.session.id;

  return {
    currentUser: state.entities.users[state.session.id],
    pageUser: state.entities.users[id] || {},
    genders: state.entities.genders,
    ethnicities: state.entities.ethnicities,
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    fetchGenders: () => dispatch(fetchGenders()),
    fetchEthnicities: () => dispatch(fetchEthnicities()),
  };
};

class ProfileContainer extends React.Component {

  componentDidMount() {
    // this.props.pageUser.id ? this.props.fetchUser(this.props.pageUser.id) : this.props.fetchUser(this.props.currentUser.id);
    this.props.match.path === "/profile" ? this.props.fetchUser(this.props.currentUser.id) : this.props.fetchUser(this.props.match.params.id);
    // fetch user location info -> handled in fetchUser
    // fetch user age using birthday -> handled in fetchUser
    // fetch user summary; if empty create one
    // fetch match percentage with user here

    this.props.fetchGenders();
    this.props.fetchEthnicities();
  }

  componentDidUpdate(prevProps) {

    if (this.props.pageUser.id !== prevProps.pageUser.id) {
      if (this.props.match.path === "/profile") {
        this.props.fetchUser(this.props.currentUser.id);
      } else {
        
        this.props.fetchUser(this.props.match.params.id);
      }
    }
    // this.props.fetchGenders();
    // this.props.fetchEthnicities();

  }


  render() {
    const { currentUser, pageUser, genders, ethnicities } = this.props;

    return (
      <>
      <div className="base">
        <Navigation />
        <ProfileHeader currentUser={currentUser} pageUser={pageUser} />
        <ProfileContent currentUser={currentUser} pageUser={pageUser} genders={genders} ethnicities={ethnicities} />
      </div>
        <LoggedInFooter />
      </>
    )
  }
}

export default connect(msp, mdp)(ProfileContainer);