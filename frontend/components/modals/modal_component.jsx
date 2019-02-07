import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

const msp = state => {
  return ({
    modal: state.ui.modal,
  });
};

const mdp = dispatch => {
  return ({
    closeModal: () => dispatch(closeModal()),
  });
};

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
 
    let modalRender = null;
    let component;

    switch (this.props.modal) {
      case null:
        component = null;
        break;
      case "messageUser":
        component = ["Hi Mark!"];
        
        break;
      default:
        component = null;
        break;
    }
    
    if (component !== null) {
      modalRender = (
        <div className="modal-background" onClick={this.props.closeModal}>
          <div className="modal-div" onClick={event => event.stopPropagation()}>
            {component}
          </div>
        </div>
      )
    }

    
    return (
      <>{modalRender}</>
    )
  }
}

export default connect(msp, mdp)(Modal);