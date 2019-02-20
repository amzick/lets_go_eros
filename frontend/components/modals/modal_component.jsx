import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';

import NewMessage from '../messages/new_message';
import MessagesThread from '../messages/messages_thread';
import UpdateField from './update_field';

const msp = state => {
  return ({
    modal: state.ui.modal,
    modalData: state.ui.modalData,
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
    let component = null;

    if (this.props.modal !== null) {
      const { modal, modalData } = this.props.modal;

      switch (modal) {
        case null:
          component = null;
          break;
        case "messageUser":
        debugger
          component = <NewMessage recipient={modalData.recipient} />;
          break;
        case "messagesThread":
        debugger
          component = <MessagesThread messages={modalData.messages} userPicture={modalData.userPicture} cardUser={modalData.cardUser} />;
          break;
        case "updateUser":
          component = <UpdateField  user={modalData.user} field={modalData.field} />
          break;
        default:
          component = null;
          break;
      }
    }

    if (component !== null) {
      modalRender = (
        <div className="modal-background" onClick={this.props.closeModal}>
          <div className="modal-div" onClick={event => event.stopPropagation()}>
            <div className="modal-exit-bar" onClick={this.props.closeModal}><i className="fas fa-times-circle"></i></div>
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