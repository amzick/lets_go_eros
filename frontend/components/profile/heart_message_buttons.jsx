import React from 'react';
// import { connect } from 'react-redux';

// const msp = state => {
//   return ({

//   });
// };

// const mdp = dispatch => {
//   return ({

//   });
// };

class HeartMessageButtons extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='heart-message-buttons'>
        <button><i className="fas fa-heart"></i><span>Heart</span></button>
        <button><i className="fas fa-envelope"></i><span>Message</span></button>
      </div>
    )
  }
}

export default HeartMessageButtons;