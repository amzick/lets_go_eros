import React from 'react';
// import { connect } from 'react-redux';

import HeartMessageButtons from './heart_message_buttons';

// const msp = state => {
//   return ({
//     currentUser: state.entities.users[state.session.id],
//   });
// };

// const mdp = dispatch => {
//   return ({

//   });
// };

class ProfileHeader extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { currentUser, pageUser } = this.props;

    const randomAge = Math.floor(Math.random() * (65 - 18 + 1) + 18);
    const randomLocation = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    const randomMatchPercentage = Math.floor(Math.random() * 100);


    return (
      <div className="profile-header" >
        <div className="profile-header-spacer" />
        <div className="profile-header-inner">
          <div className="profile-header-left">
            <div className="profile-picture-thumb">
              {/* <img src="https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg" /> */}
              <img src="https://randomuser.me//api//portraits//women//68.jpg" />
            </div>
            <div className="profile-info-div">
              <h1>{pageUser.fname}</h1>
              <div className="profile-age-location-match">
                <p>{pageUser.age}</p>
                <span>•</span>
                <span>{pageUser.city}, {pageUser.state}</span>
                {/* <span>Super freaking long, {pageUser.state}</span> */}
                {pageUser.id === currentUser.id ? null : <span>•</span>}
                {pageUser.id === currentUser.id ? null : <span>{randomMatchPercentage}% Match</span>}
              </div>
            </div>
          </div>

          <div className="profile-header-right">
            {pageUser.id === currentUser.id ? null : <HeartMessageButtons />}
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileHeader;