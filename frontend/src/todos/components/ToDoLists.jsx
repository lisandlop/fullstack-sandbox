import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Typography from '@material-ui/core/Typography'

import { ToDoListForm } from './ToDoListForm'
import { Form } from './Form'

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({}) // object with all todo lists
  const [activeList, setActiveList] = useState() // list of chosen todo list
  const [inputValue, setInputValue] = useState("");
  const [newTodoList, setNewTodoList] = useState([]); // SAMMA SOM FÖRSTA

  useEffect(() => {
    fetchData()
  }, [])

  // OWN
  const fetchData = () => {
    fetch("http://localhost:3001/todo")
    .then(response => {
      console.log(response);
      return response.json(); 
    })
    .then(setToDoLists)
    .catch(err => {
      console.log(err);
    })
  }
  

  // Posts/adds new todo list 
  const postNewTodoList = ({id, title, todos, completed}) => {
    console.log('completed: ', completed);
    console.log('todos: ', todos);
    console.log('title: ', title);
    console.log('id: ', id);

    fetch("http://localhost:3001/todo", { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        [id]: {
          id, 
          title, 
          todos, 
          completed
        }
      })
    }).then(response => {
      console.log(response);
      return response.json(); 
    })
    .then(setToDoLists)
    
    // .then(setToDoLists)
  }

  if (!Object.keys(toDoLists).length) return null
  console.log(Object.keys(toDoLists)); // THE TODO LIST ARRAY (with updated)
  return <Fragment>
    {console.log(toDoLists)}
    
    {/* <Form inputValue={inputValue} setInputValue={setInputValue} newTodoList={newTodoList} setNewTodoList={setNewTodoList} postNewTodoList={postNewTodoList}/> */}
    <Form inputValue={inputValue} setInputValue={setInputValue} toDoLists={toDoLists} setToDoLists={setToDoLists} postNewTodoList={postNewTodoList}
    
    newTodoList={newTodoList} setNewTodoList={setNewTodoList}

    />
    <Card style={style}>
      <CardContent style={{fontFamilty: 'Space Grotesk'}}>
        <Typography
          component='h2'
        >
          My ToDo Lists
        </Typography>
        <List>
          {Object.keys(toDoLists).map((key) => <ListItem
            key={key}
            button
            onClick={() => setActiveList(key)}
          >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary={toDoLists[key].title} />
          </ListItem>)}
        </List>
      </CardContent>
    </Card>
    {toDoLists[activeList] && <ToDoListForm // ToDoListForm component
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { todos }) => {
        const listToUpdate = toDoLists[id]
        console.log('listToUpdate: ', listToUpdate);
        setToDoLists({
          ...toDoLists,
          [id]: { ...listToUpdate, todos }
        })
      }}
    />}
      <Button onClick={ () => postNewTodoList(
        {
          id: 10, 
          title: 'hey', 
          todos: ['yeah'], 
          completed: false
        }
      ) }>
        Add Todo List
      </Button>
  </Fragment>
}

/* TO DO
  * MAIN TASK * 
    - Add general UX & styling (where to put "add"?) / (colors&font)
    - Lägg till FONT (läggs till på text!!! men inte allt annat)
    - Lägg till media queries för margin på card i Form.jsx
    - (MAYBE) When have pressed specific "todo" from todo-list, and press "save" -> collapse list item
    - (MAYBE) Add styling "Add todo" button

  * ADDITIONAL TASKS * 
    1. Autosave when added task
    2. (Make it possible to) indicate that a todo is completed
        - maybe press checkbox? 
        - text-decoration: overline (?) & opacity 0.5
        - change "completed" till true
        - do toggle so that can set to false and undo
    3. Indicate that todolist is completed if all todo items within are completed
        - if all todos in todoList has completed=true -> mark as green or overline/opacity
    4. Add date for completion to todo items -> indicate remaining time / overdue 
*/
