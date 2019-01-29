import React from 'react';
import { connect } from 'react-redux';

const msp = state => {
  return ({

  });
};

const mdp = dispatch => {
  return ({

  });
};

class DiscoverySearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    console.log("Searching..");
  }

  render() {
    return (
      <div className="discover-search-div">
        <form className="discover-search-form" onSubmit={this.handleSearch}>
          <span className="fas fa-search" />
            <input type="search" placeholder="What are you into?" />
          
        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(DiscoverySearch);