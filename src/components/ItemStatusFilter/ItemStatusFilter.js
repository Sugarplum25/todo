import React, { Component } from "react";

import "./ItemStatusFilter.css";

class ItemStatusFilter extends Component {
  buttons = [
    {name: 'all', label: 'All'},
    {name: 'active', label: 'Active'},
    {name: 'done', label: 'Done'},
  ]

  render() {
    const { filter, filterChange } = this.props;
    const buttons = this.buttons.map(({name, label}) => {
      const isActive = (name === filter);
      const btnClass = isActive ? 'btn-info' : 'btn-outline-secondary';
      return (
        <button type="button" 
                className={`btn ${btnClass}`} 
                key={name}
                onClick={() => filterChange(name)}>
                {label}
        </button>
      )
    });
    return (
      <div className="btn-group">
        {buttons}
      </div>
    );
  }
}

export default ItemStatusFilter;
