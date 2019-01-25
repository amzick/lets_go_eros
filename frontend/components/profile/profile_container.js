import { connect } from 'react-redux';
import Profile from './profile';

const msp = (state, ownProps) => {
  
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mdp = (dispatch, ownProps) => {
  return {

  };
};

export default connect(msp, mdp)(Profile);