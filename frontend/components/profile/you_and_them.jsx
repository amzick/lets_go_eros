import React from 'react';

import LoadingComponent from '../loading/loading_component';
// import { connect } from 'react-redux';
import { fetchAgreementPercentage } from '../../util/user_api_util';

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
    this.state = {
      agreementPercentage: null,
      agreementPercentageLoaded: false,
      renderComponent: null,
    };
  }

  componentDidMount() {
    const { currentUser, pageUser } = this.props;
    const that = this;
    if (currentUser.id !== pageUser.id) {
      fetchAgreementPercentage(currentUser.id, pageUser.id).then((resp) => { 
        let newComponent;
        if (resp) {
          newComponent = <p><br />{`You and ${pageUser.fname} answered ${this.state.agreementPercentage} percent of mutually answered questions exactly the same!`}</p>
        } else {
          newComponent = <p><br />{`${pageUser.fname} hasn't answered any questions yet, but when they do we'll show you how many questions you answered the same way!`}</p>
        }

        that.setState({ agreementPercentage: resp,  renderComponent: newComponent, agreementPercentageLoaded: true });
      });
    }
  }

  shouldComponentUpdate(prevProps) {
    const { currentUser, pageUser } = this.props;
    const that = this;
    if (currentUser.id !== pageUser.id) {
      fetchAgreementPercentage(currentUser.id, pageUser.id).then((resp) => {
        let newComponent;
        if (resp) {
          newComponent = <p><br />{`You and ${pageUser.fname} answered ${this.state.agreementPercentage} percent of mutually answered questions exactly the same!`}</p>
        } else {
          newComponent = <p><br />{`Either you or ${pageUser.fname} haven't answered any questions yet, but when both of you have we'll show you how many questions you answered the same way!`}</p>
        }

        that.setState({ agreementPercentage: resp,  renderComponent: newComponent, agreementPercentageLoaded: true });
      });
    }
    return true;
  }

  render() {
    const { pageUser } = this.props;
    // let renderComponent;
    // if (this.state.agreementPercentageLoaded) {
    //   if (this.state.agreementPercentage) {
    //     renderComponent = <p><br />{`You and ${pageUser.fname} answered ${this.state.agreementPercentage} percent of mutually answered questions exactly the same!`}</p>
    //   } else {
    //     renderComponent = <p><br />{`${pageUser.fname} hasn't answered any questions yet, but when they do we'll show you how many questions you answered the same way!`}</p>
    //   }
    // }

    return (
      <div className='profile-text-card'>
        <h2>You &amp; {pageUser.fname}</h2>
        {this.state.agreementPercentageLoaded ? this.state.renderComponent : <LoadingComponent />}
      </div>
    )
  }
}

export default YouAndThem;