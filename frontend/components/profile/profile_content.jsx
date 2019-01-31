import React from 'react';
import { connect } from 'react-redux';
import ProfileTextCard from './profile_text_card';
import YouAndThem from './you_and_them';


const msp = state => {
  // console.log("msp");
  return ({
    // genders: state.entities.genders,
    // ethnicities: state.entities.ethnicities,
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

    const { currentUser, pageUser } = this.props;
    // information about gender, relationship status, height and body type
    let gendersArray = [];
    let gendersFormatted = "";
    let ethnicitiesArray = [];
    let ethnicitiesFormatted = "";

    if (Object.entries(this.props.genders).length !== 0 && Object.entries(pageUser).length !== 0) {
      gendersArray = pageUser.gender_ids.map((genderId) => {
        return this.props.genders[genderId].gender;
      });
      const arrayLength = gendersArray.length;
      gendersFormatted = gendersArray.splice(0, arrayLength - 1).join(", ") + " " + gendersArray[0] + ".";
    }

    if (Object.entries(this.props.ethnicities).length !== 0 && Object.entries(pageUser).length !== 0) {
      ethnicitiesArray = pageUser.ethnicity_ids.map((ethnicityId) => {
        return this.props.ethnicities[ethnicityId].ethnicity;
      });
      const arrayLength = ethnicitiesArray.length;
      if (arrayLength > 1) {
        ethnicitiesFormatted = ethnicitiesArray.splice(0, arrayLength - 1).join(", ") + " and " + ethnicitiesArray[0];
      } else {
        ethnicitiesFormatted = ethnicitiesArray[0];
      }
    }

    const stars = `${pageUser.fname} is a ${pageUser.height ? pageUser.height : ""} ${gendersFormatted ? gendersFormatted : ""}`;

    const snowflake = `${pageUser.fname}'s ethnic background is ${ethnicitiesFormatted}, and they're a ${pageUser.astrology_sign}!`;
    // information on race and sign

    // TODO when I do looking for
    const eyes = "Looking for...";

    return (
      <div className="profile-content">
        <div className="profile-content-2-3">
          <div className="profile-summary">
            <ProfileTextCard pageUser={pageUser} header="Summary" text={pageUser.summary} />
          </div>
          {pageUser.id === currentUser.id ? null : <YouAndThem pageUser={pageUser} />}
        </div>
        <div className="profile-content-1-3">

          <div className="profile-stats">
            <div className="profile-details">
              <div className="details-icon"><img src="https://cdn.okccdn.com/media/img/icons/details-sparkle@3x.png" /></div>
              <div className="details-text">{stars}</div>
            </div>

            <div className="profile-details">
              <div className="details-icon"><img src="https://cdn.okccdn.com/media/img/icons/details-snowflake@3x.png" /></div>
              <div className="details-text">{snowflake}</div>
            </div>

            <div className="profile-details">
              <div className="details-icon"><img src="https://cdn.okccdn.com/media/img/icons/details-eyes@3x.png" /></div>
              <div className="details-text">I've set the max height and max width of these stupid fucking images and their divs and they ignore it, why... </div>
            </div>
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