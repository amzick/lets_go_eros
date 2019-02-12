import React from 'react';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';
import { createHeart, deleteHeart } from '../../actions/heart_actions';
import { fetchUser } from '../../actions/user_actions';




const mdp = dispatch => {
  return ({
    openModal: (modalData) => () => dispatch(openModal("messageUser", modalData)),
    createHeart: (crushID) => dispatch(createHeart(crushID)),
    deleteHeart: (crushID) => dispatch(deleteHeart(crushID)),
    fetchUser: (userID) => dispatch(fetchUser(userID)),
  });
};

class HeartMessageButtons extends React.Component {

  constructor(props) {
    super(props);
    this.pageUser = props.pageUser;
    // this.state = {
    //   is_crush: this.pageUser.is_crush,
    // };

    this.toggleHeart = this.toggleHeart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // why... this is so dumb
    // if I comment this out you can heart a user but never unheart
    this.pageUser = nextProps.pageUser;
  }

  toggleHeart(event) {
    event.preventDefault();
    const { pageUser, createHeart, deleteHeart } = this.props;
    
    if (this.pageUser.is_crush) {
      deleteHeart(pageUser.id).then(() => this.props.fetchUser(this.props.pageUser.id));
    } else {
      createHeart(pageUser.id).then(() => {
        this.props.fetchUser(this.props.pageUser.id);
      });
    }
  }



  render() {
    return (
      <div className='heart-message-buttons-div'>
        <button className={(this.props.pageUser.is_crush ? "heart-message-button-hearted" : "heart-message-button")} onClick={this.toggleHeart} ><i className="fas fa-heart"></i><span>Heart</span></button>
        <button className="heart-message-button" onClick={this.props.openModal({ recipient: this.props.pageUser })}><i className="fas fa-envelope"></i><span>Message</span></button>
      </div>

    )
  }
}

export default connect(null, mdp)(HeartMessageButtons);