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
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.state = {};
    this.state.searchValue = "";
    this.state.searchIconClass = "fas fa-search";
  }

  handleSearch(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value }, () => {
      if (this.state.searchValue !== "") {
        this.setState({ searchIconClass: "fas fa-times-circle" });
      } else {
        this.setState({ searchIconClass: "fas fa-search" });
      }
    });
  }

  clearSearch(event) {
    if (this.state.searchIconClass === "fas fa-times-circle") {
      event.preventDefault();

      this.setState({ searchValue: "" }, () => this.setState({ searchIconClass: "fas fa-search" }));
    } else {
      event.preventDefault();
    }
  }

  render() {
    return (
      <div className="discover-search-div">
        <form className="discover-search-form" onSubmit={this.handleSearch}>
          <span className={this.state.searchIconClass} onClick={this.clearSearch} />
          <input type="text" placeholder="What are you into?" onChange={this.handleChange} value={this.state.searchValue} />

        </form>
      </div>
    )
  }
}

export default connect(msp, mdp)(DiscoverySearch);