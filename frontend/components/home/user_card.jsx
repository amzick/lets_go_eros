import React from 'react';

const UserCard = props => {
  const randomAge = Math.floor(Math.random() * (65 - 18 + 1) + 18);
  const randomMatchPercentage = Math.floor(Math.random() * 100);
  let matchClass;
  switch (true) {
    case (randomMatchPercentage <= 10):
      matchClass = "usercard-match-percentage-bad";
      break;
    case (randomMatchPercentage >= 90):
      matchClass = "usercard-match-percentage-good";
      break;
    default:
      matchClass = "usercard-match-percentage";
      break;
  }
  return (
    <div className="usercard-div">
      <div className="usercard-thumb">
        <img src="https://s3.amazonaws.com/letsgoeros-dev/Eros.jpeg" />
      </div>
      <div className="usercard-text">
        <span className="usercard-info">0123456789ABC, {randomAge}</span>
        <span className="usercard-location">Long Location name, ST</span>
        <div className={matchClass}>{randomMatchPercentage}%</div>
      </div>
    </div>
  )
}

export default UserCard;