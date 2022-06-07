import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [users, setUsers] = useState([]);
  let [name, setName] = useState('');
  let [age, setAge] = useState('');
  let [id, setId] = useState('');
  let [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3001/users`)
      .then((response) => response.json())
      .then((users) => setUsers(users));
  },[]);

  const saveUser = () => {
    fetch(`http://localhost:3001/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        age
      })
    })
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
        setName('');
        setAge('');
      });
  }

  const deleteUser = (userId) => {
    fetch(`http://localhost:3001/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
        setName('');
        setAge('');
      });
  }

  const saveUpdatedUser = () => {
    fetch(`http://localhost:3001/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        age
      })
    })
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
        setName('');
        setAge('');
        setId('');
        setEditMode(false);
      });
  }

  const editUser = (user) => {
    setName(user.name);
    setAge(user.age);
    setId(user.id);
    setEditMode(true);
  }

  return (
    <>
      <h1>{editMode ? 'Edit ' : 'Add '} User</h1>
      <div>
        <label>Name:</label>
      <input type="text" value={name} onChange={(event)=> {setName(event.target.value)}}/>
      </div>
      <div>
      <label>Age:</label>
      <input type="number" value={age} onChange={(event)=> {setAge(event.target.value)}}/>
      </div>
      {editMode ? <button onClick={saveUpdatedUser}>update</button> : <button onClick={saveUser}>Save</button>}
      
      <br/>
      <br/>
      <h1>Users</h1>
      <table border='1'>
        <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Operation</th>
        </tr>
        </thead>
        <tbody>
        {users.map((user,index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td><button onClick={(e)=> editUser(user)}>Edit</button> <button onClick={(e)=> deleteUser(user.id)}>Delete</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
