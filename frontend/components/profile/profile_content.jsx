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
    }

    const stars = `${pageUser.fname} is a ${pageUser.height ? pageUser.height : ""} ${gendersFormatted ? gendersFormatted : ""}`;

    // information on race and sign
    let snowflake;
    // TODO when I do looking for
    const eyes = "Looking for...";

    return (
      <div className="profile-content">
        <div className="profile-content-2-3">
          <div className="profile-summary">
            <ProfileTextCard pageUser={pageUser} header="Summary" text={pageUser.summary} />
          </div>
          {pageUser.id === currentUser.id ? null : <YouAndThem />}
        </div>
        <div className="profile-content-1-3">
          <div className="profile-stats">
            {stars}
            {ethnicitiesArray}
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