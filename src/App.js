import React, {useState} from 'react';
import './App.css';

//composant todo
function Todo ({todo, index, CompleteTodo, RemoveTodo}) {
  return (
  <div style={{textDecoration: todo.isCompleted ? 'line-through' : ""}} className="todo">
    {todo.text}
    <div>
      <button className="button" onClick={() => CompleteTodo(index)}>Termine</button>
      <button className="button" onClick={() => RemoveTodo(index)}>X</button>
    </div>
  </div>
  )
}

//composant ajout todo
function TodoForm({addTodo}){
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if(!value) return; //return pour que s'il n'y a pas de valeur, la fonction s'arrete
    addTodo(value);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      className="input"
      placeholder="Ecrire un todo" 
      value={value} 
      onChange={e => setValue(e.target.value)} /> 
    </form>
  )
}



function App() {
  const [todos, setTodos] = useState([
    {
      text: "Premier todo",
      isCompleted: false
    },
    {
      text: "Aller à la poste",
      isCompleted: false
    },
    {
      text: "Revenir au bureau",
      isCompleted: false
    },
  ]);

  const addTodo = text => {
    const isCompleted = false;
    //reverse => renverser le tableau avant d'ajouter l'élément afin d'avoir l'ordre de départ
    const newTodos = [...todos.reverse(), {text, isCompleted}];
    setTodos(newTodos);
  }

  const RemoveTodo = indice => {
    const newTodos = [...todos];
    newTodos.splice(indice,1);
    setTodos(newTodos.reverse());
  }

  

  const CompleteTodo = indice => {
    const newTodos = [...todos];
    newTodos[indice].isCompleted = true;
    setTodos(newTodos.reverse());
  }


  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo} />

        {/* J'utilise la methode reverse pour renverser le tableau des todos et ensuite map pour faire des iterations dans le tableau todo*/}
        {todos.reverse().map((todo, index) => (
          <Todo key={index} index={index} todo={todo} CompleteTodo={CompleteTodo} RemoveTodo={RemoveTodo}/>
        ))}
        
      </div>
    </div>
  )
}

export default App;
