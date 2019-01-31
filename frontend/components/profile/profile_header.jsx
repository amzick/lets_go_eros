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
    this.showUpdatePrompt = this.showUpdatePrompt.bind(this);
    this.hideUpdatePrompt = this.hideUpdatePrompt.bind(this);
    this.state = {};
    this.state.promptClass = "update-picture-hidden";
  }

  showUpdatePrompt(event) {
    this.setState({ promptClass: "update-picture-hover" });
  }

  hideUpdatePrompt(event) {
    this.setState({ promptClass: "update-picture-hidden" });

  }

  render() {

    const { currentUser, pageUser } = this.props;

    const randomAge = Math.floor(Math.random() * (65 - 18 + 1) + 18);
    const randomLocation = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
    // const randomMatchPercentage = Math.floor(Math.random() * 100);



    let profilePictureLastIndex;
    let profilePictureSrc;

    if (pageUser.id) {
      profilePictureLastIndex = pageUser.profile_pictures.length - 1;
      profilePictureSrc = pageUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";
    }


    return (
      <div className="profile-header" >
        <div className="profile-header-spacer" />
        <div className="profile-header-inner">
          <div className="profile-header-left">
            <div className="profile-picture-thumb" onMouseEnter={this.showUpdatePrompt} onMouseLeave={this.hideUpdatePrompt}>
              {/* <img src="https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg" /> */}
              {currentUser === pageUser ? <div className={this.state.promptClass}><div className="center-text-absolute"><span>Change </span><span>Profile </span><span>Picture </span></div> </div> : null}
              <img src={profilePictureSrc} />
            </div>
            <div className="profile-info-div">
              <h1>{pageUser.fname}</h1>
              <div className="profile-age-location-match">
                <p>{pageUser.age}</p>
                <span>•</span>
                <span>{pageUser.city}, {pageUser.state}</span>
                {/* <span>Super freaking long, {pageUser.state}</span> */}
                {pageUser.id === currentUser.id ? null : <span>•</span>}
                {pageUser.id === currentUser.id ? null : <span>{pageUser.match}% Match</span>}
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