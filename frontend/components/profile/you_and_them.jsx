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

class YouAndThem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {pageUser} = this.props;
    return (
      <div className='profile-text-card'>
        <h2>You &amp; {pageUser.fname}</h2>
      </div>
    )
  }
}

export default YouAndThem;