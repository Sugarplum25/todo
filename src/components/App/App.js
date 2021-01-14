import React, { Component } from 'react';
import { uniqueId } from 'lodash';

import Header from '../Header';
import SearchPanel from '../SearchPanel';
import TodoList from '../ToDoList';
import ItemStatusFilter from '../ItemStatusFilter';
import AddItemPanel from '../AddItemPanel';

import './App.css';

class App extends Component {
  
  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Build React App'),
      this.createTodoItem('Have a lunch')
    ],
    searchedData: '',
    filter: 'all',
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: uniqueId(),
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const before = todoData.slice(0, idx);
      const after = todoData.slice(idx + 1);
      const result = [...before, ...after];
      return {
        todoData: result,
      };
    }
    )
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const result = [...todoData, newItem];
      return {
        todoData: result
      }
    });
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    const before = arr.slice(0, idx);
    const after = arr.slice(idx + 1);
    return [...before, newItem, ...after];
  }

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
  }

  filterData(items, text) {
    if (text.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.toLowerCase().indexOf(text.toLowerCase()) > -1);
  }

  filterStatus(items, filter) {
    switch(filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done); 
      default:
        return items;  
    }
  } 

  filterItems = (searchedData) => {
    this.setState({ searchedData });
  }

  filterChange = (filter) => {
    this.setState(({ filter }))
  }

  render() {
    const { todoData, searchedData, filter } = this.state;
    const filteredData = this.filterStatus(
      this.filterData(todoData, searchedData), filter
    );
    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <Header toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel filterItems={this.filterItems} />
          <ItemStatusFilter 
            filter={filter}
            filterChange={this.filterChange}
          />
        </div>
        <TodoList
          todos={filteredData}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleImportant={this.onToggleImportant}
        />
        <AddItemPanel addItem={this.addItem} />
      </div>
    )
  }
};
export default App;