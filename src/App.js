import './App.css';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";


function App() {
  const [isCompletedScreen, setIsCompletedScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setComplitedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodo = {
      title: newTitle,
      description: newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodo);
    setAllTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-"+ yyyy + " at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setComplitedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteComplitedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setComplitedTodos(reducedTodo);
  };

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedComplitedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo) {
      setAllTodos(savedTodo);
    }

    if(savedComplitedTodo) {
      setComplitedTodos(savedComplitedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?" />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task desciption?" />
          </div>
          <div className="todo-input-item">
            <button type="button" className="primaryBtn" onClick={handleAddTodo}>Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompletedScreen === false && 'active'}`} onClick={()=>setIsCompletedScreen(false)}>Todo</button>
          <button className={`secondaryBtn ${isCompletedScreen === true && 'active'}`} onClick={()=>setIsCompletedScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
          {isCompletedScreen === false && allTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' title='Delete?' onClick={()=>handleDeleteTodo(index)} />
                  <BsCheckLg className='check-icon' onClick={()=>handleComplete(index)} title='Complete?' />
                </div>
              </div>
            )
          })}

          {isCompletedScreen === true && completedTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on:{item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='icon' title='Delete?' onClick={()=>handleDeleteComplitedTodo(index)} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  );
}

export default App;
