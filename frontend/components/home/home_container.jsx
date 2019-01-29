import React from 'react';
import { connect } from 'react-redux';
import Navigation from './navigation';
import DiscoverySection from './discovery_section';


const msp = state => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
};

const mdp = dispatch => {
  return ({
  });
};

class HomeContainer extends React.Component {
  render() {

    return (
      <div>
        <Navigation />
        <div className="home-space-div" />
        <DiscoverySection search={true} />
        <DiscoverySection />
        <DiscoverySection />
        <p>Logged in as {this.props.currentUser.fname}.</p>
      </div>
    )
  }
}

export default connect(msp, mdp)(HomeContainer);