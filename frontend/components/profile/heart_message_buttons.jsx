import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';


const msp = state => {
  return ({

  });
};

const mdp = dispatch => {
  return ({
    openModal: () => dispatch(openModal("messageUser")),
  });
};

class HeartMessageButtons extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      

        <div className='heart-message-buttons'>
          <button ><i className="fas fa-heart"></i><span>Heart</span></button>
          <button onClick={this.props.openModal}><i className="fas fa-envelope"></i><span>Message</span></button>
        </div>
      
    )
  }
}

export default connect(msp, mdp)(HeartMessageButtons);