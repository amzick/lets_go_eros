import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/user_actions';
import { Link } from 'react-router-dom';

const msp = state => {
  return ({
    // city: state.entities.users
  });
};

const mdp = dispatch => {
  return ({
    // fetchUser: (userId) => dispatch(fetchUser(userId)),
  });
};

class UserCard extends React.Component {

  componentDidMount() {

  }

  render() {
    const { cardUser } = this.props;
    const profilePictureLastIndex = cardUser.profile_pictures.length - 1;
    const profilePictureSrc = cardUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";

    // const randomAge = Math.floor(Math.random() * (65 - 18 + 1) + 18);
    // const randomMatchPercentage = Math.floor(Math.random() * 100);
    let matchClass;
    switch (true) {
      case (cardUser.match <= 10):
        matchClass = "usercard-match-percentage-bad";
        break;
      case (cardUser.match >= 90):
        matchClass = "usercard-match-percentage-good";
        break;
      default:
        matchClass = "usercard-match-percentage";
        break;
    }
    return (

      <Link to={`/profiles/${cardUser.id}`}>
        <div className="usercard-div">
          <div className="usercard-thumb">
            <img src={profilePictureSrc} />
          </div>
          <div className="usercard-text">
            <span className="usercard-info">{cardUser.fname}, {cardUser.age}</span>
            <span className="usercard-location">{cardUser.city ? cardUser.city : "No city..."}, {cardUser.state ? cardUser.state : "XX"}</span>
            <div className={matchClass}>{cardUser.match}%</div>
          </div>
        </div>
      </Link>
    )
  }
}

export default connect(msp, mdp)(UserCard);