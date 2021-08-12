import React, { Component } from 'react';
import './SearchPanel.css';

class SearchPanel extends Component {
  
  state = {
    searchedData: '',
  }
  
  filterItems = (e) => {
    const searchedData = e.target.value;
    this.setState({ searchedData });
    this.props.filterItems(searchedData);
  }

  render() {
    return (
      <input className="form-control search-input"
            type="text"
            placeholder="type to search"
            value={this.state.searchedData}
            onChange={this.filterItems} 
      />
    );
  }
};

export default SearchPanel;