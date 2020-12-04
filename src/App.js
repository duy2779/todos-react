import './App.css';
import React, { useState } from 'react';
import TodoItem from './components/TodoItem';
import tick from './img/check-all.svg';

function App() {
  const storageKey = 'Todos';
  let [todoItems, setTodoItems] = useState(JSON.parse(localStorage.getItem(storageKey)) || []);

  let [taskInputText, settaskInputText] = useState('');

  function loadStorage(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

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
      loadStorage(todoUpdate);
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

      let todoUpdate = [
        { title: text, isCompleted: false },
        ...todoItems
      ]
      setTodoItems(todoUpdate);
      loadStorage(todoUpdate);
      settaskInputText('');
    }
  }

  function onChange(event) {
    let text = event.target.value;
    settaskInputText(text);
  }

  function onCheckAll() {
    let todoUpdate = JSON.parse(JSON.stringify(todoItems));
    for (const item in todoUpdate) {
      todoUpdate[item].isCompleted = true;
    }
    console.log(todoItems);
    setTodoItems(todoUpdate);
    loadStorage(todoUpdate);
  }

  return (
    <div className="App">
      <div className="todo-list">
        <div className="header">
          <img src={tick} alt="#" width="25" onClick={onCheckAll} />
          <input type="text" placeholder="What needs to be done?" onKeyUp={onKeyUp} value={taskInputText} onChange={onChange} />
        </div>
        {
          todoItems.length > 0 && todoItems.map((item, index) => <TodoItem key={index} item={item} onClick={onItemClicked(item)} />)
        }
        {
          todoItems.length === 0 && <p style={{ textAlign: 'center' }}>Nothing here</p>
        }
      </div>
    </div >
  );
}

export default App;
