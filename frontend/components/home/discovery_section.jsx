import React from 'react';
import { connect } from 'react-redux';
import DiscoverySearch from './discovery_search';
import UserCard from './user_card';

const msp = state => {
  return ({

  });
};

const mdp = dispatch => {
  return ({

  });
};

class DiscoverySection extends React.Component {
  render() {

    // todo: fetch actual users
    const queryResult = []
    for (let n = 0; n < 10; n++) {
      queryResult.push(<UserCard key={n} />)
    }

    return (
      <div className="discovery-section" >
        {this.props.search ? <DiscoverySearch /> : null}
        <h1>Get H from props</h1>
        <div className="usercard-row">{queryResult}</div>
      </div>
    );
  }
}

export default connect(msp, mdp)(DiscoverySection);