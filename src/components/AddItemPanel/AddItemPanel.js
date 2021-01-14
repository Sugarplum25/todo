import React, { Component } from 'react';
import './AddItemPanel.css';

class AddItemPanel extends Component {

  state = {
    input: '',
  }

  inputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    if (this.state.input !== '') {
      this.props.addItem(this.state.input);
      this.setState({
        input: '',
      })
    }
  }

  render() {
    return (
      <form className="add-item-panel d-flex"
            onSubmit={this.submitForm}>
        <input className="form-control"
                type="text"
                placeholder="write text here"
                value = {this.state.input}
                onChange={this.inputChange} 
        />
        <button className="btn btn-outline-secondary">
            Add item
        </button>
      </form>
    );
  }
};

export default AddItemPanel;