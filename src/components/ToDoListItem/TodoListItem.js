import React, { Component } from 'react';
import cn from 'classnames';
import './ToDoListItem.css';

class TodoListItem extends Component {

  render() {
    const { label, 
            onDeleted, 
            onToggleImportant, 
            onToggleDone, 
            important, 
            done, } = this.props;

    const spanClass = cn({
      'todo-list-item': true,
      'done': done, 
      'important': important,
    });

    const markedBtn = cn({
      'btn': true,
      'btn-outline-success': true,
      'btn-sm': true,
      'float-right': true,
    });
    
    return (
      <div className={spanClass}>
        <span
          className="todo-list-item-label"
          onClick={onToggleDone} >
          {label}
        </span>
  
        <button className={markedBtn}
                type="button"
                onClick={onToggleImportant}>
          <i className="fa fa-exclamation" />
        </button>
  
        <button type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={onDeleted}>
          <i className="fa fa-trash-o" />
        </button>
      </div>
    );
  }
}

export default TodoListItem;