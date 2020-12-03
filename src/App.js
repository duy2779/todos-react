import './App.css';
import React, { useState } from 'react';
import TodoItem from './components/TodoItem';
import tick from './img/check-all.svg';

function App() {
  let [todoItems, setTodoItems] = useState([
    { title: 'Go to market', isCompleted: true },
    { title: 'Text crush', isCompleted: true },
    { title: 'Blend pictures' },
  ]);

  let [taskInputText, settaskInputText] = useState('');

  function onItemClicked(item) {
    return (event) => {
      const isCompleted = item.isCompleted;
      const index = todoItems.indexOf(item);
      let todoUpdate = [
        ...todoItems.slice(0, index),
        { ...item, isCompleted: !isCompleted },
        ...todoItems.slice(index + 1)
      ]
      setTodoItems(todoUpdate);
      console.log(todoUpdate.todoItems);
    }
  }

  function onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      console.log(text);
      if (!text || text === '') {
        return;
      }

      text = text.trim();
      if (!text) { return; }

      setTodoItems([
        { title: text, isCompleted: false },
        ...todoItems
      ]);
      settaskInputText('');
    }
  }

  function onChange(event){
    let text = event.target.value;
    settaskInputText(text);
  }

  return (
    <div className="App">
      <div className="todo-list">
        <div className="header">
          <img src={tick} alt="#" width="25" />
          <input type="text" placeholder="What needs to be done?" onKeyUp={onKeyUp} value={taskInputText} onChange={onChange} />
        </div>
        {
          todoItems.length > 0 && todoItems.map((item, index) => <TodoItem key={index} item={item} onClick={onItemClicked(item)} />)
        }
        {
          todoItems.length === 0 && <p>Nothing here</p>
        }
      </div>
    </div>
  );
}

export default App;
