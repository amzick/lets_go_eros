import React from 'react';
// import { connect } from 'react-redux';
import { createPhoto } from '../../util/user_api_util';

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
    this.state = {
      promptClass: "update-picture-hidden",
      newPhoto: null,
      photoUrl: null,
    };
    this.showUpdatePrompt = this.showUpdatePrompt.bind(this);
    this.hideUpdatePrompt = this.hideUpdatePrompt.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleProfilePictureClick = this.handleProfilePictureClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showUpdatePrompt(event) {
    if (this.props.currentUser === this.props.pageUser) {
      this.setState({ promptClass: "update-picture-hover" });
    }
  }

  hideUpdatePrompt(event) {
    if (this.props.currentUser === this.props.pageUser) {
      this.setState({ promptClass: "update-picture-hidden" });
    }
  }

  handleProfilePictureClick(event) {
    if (this.props.currentUser === this.props.pageUser) {
      $("input[id='upload-image']").click();
    }
  }

  handleFile(event) {
    event.preventDefault();
    const setPhoto = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.setState({ newPhoto: setPhoto, photoUrl: fileReader.result }, () => {

        $("input[id='submit-image']").click();
      });
    };
    if (setPhoto) {
      // for previewing the photo 


      fileReader.readAsDataURL(setPhoto);
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.newPhoto) {
      // instantiate a new form data object
      const x = new FormData();
      // append form data into this object
      x.append('user[id]', currentUser.id);
      x.append('user[photo]', this.state.newPhoto);

      createPhoto(x).then((resp) => {

        this.setState({ newPhoto: null, photoUrl: null }, () => {
          window.location.reload();
        });
      }, (errors) => {

      });

    }
  }

  render() {

    const { currentUser, pageUser } = this.props;

    let profilePictureLastIndex;
    let profilePictureSrc;

    if (pageUser.id) {
      if (pageUser.bot_img_src) {
        profilePictureSrc = pageUser.bot_img_src;
      } else {
        profilePictureLastIndex = pageUser.profile_pictures.length - 1;
        profilePictureSrc = pageUser.profile_pictures[profilePictureLastIndex] || "https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg";
      }
    }


    return (
      <div className="profile-header" >
        <form onSubmit={this.handleSubmit} style={{ display: "none" }}>
          <input type="file" accept="image/*" id="upload-image" style={{ display: "none" }} onChange={this.handleFile} />
          <input type="submit" id="submit-image" style={{ display: "none" }} />
        </form>

        <div className="profile-header-spacer" />
        <div className="profile-header-inner">
          <div className="profile-header-left">
            <div className="profile-picture-thumb" onMouseEnter={this.showUpdatePrompt} onMouseLeave={this.hideUpdatePrompt} onClick={this.handleProfilePictureClick}>
              {currentUser === pageUser ?
                <div className={this.state.promptClass}>


                  <div className="center-text-absolute">
                    <span>Change </span><span>Profile </span><span>Picture</span>
                  </div>


                </div>
                : null}
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