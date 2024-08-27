import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === index) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map((todo, i) => {
      if (i === editingIndex) {
        return { ...todo, text: editingText };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-5">My Todo List</h1>
      <div className="flex mb-6">
        <input
          type="text"
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-3 rounded-r-lg hover:bg-blue-600 transition-all duration-300"
          onClick={addTodo}
        >
          Add
        </button>
      </div>
      <ul className="space-y-4">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-3 border rounded-lg shadow-sm transition-all duration-300 ${
              todo.completed ? 'bg-green-100 text-gray-500 line-through' : 'bg-white'
            }`}
          >
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button
                  className=" text-white px-3 py-1 rounded-lg ml-2"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded-lg ml-2"
                  onClick={() => setEditingIndex(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span
                  className="flex-grow cursor-pointer"
                  onClick={() => toggleTodo(index)}
                >
                  {todo.text}
                </span>
                <div className="flex space-x-2">
                  <button
                    className=" text-white px-3 py-1 rounded-lg"
                    onClick={() => startEditing(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all duration-300"
                    onClick={() => deleteTodo(index)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
