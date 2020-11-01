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

const postNewTodoList = ({id, title, todos}) => {
  fetch("http://localhost:3001/todo", { 
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      [id]: { // make a string? maybe id++ for every new? 
        id, 
        title, 
        todos
      }
    })
  })
}

export const ToDoLists = ({ style }) => {
  const [toDoLists, setToDoLists] = useState({})
  const [activeList, setActiveList] = useState()

  useEffect(() => {
    fetchData()
  }, [])

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

  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent>
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
    {toDoLists[activeList] && <ToDoListForm
      key={activeList} // use key to make React recreate component to reset internal state
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { todos }) => {
        const listToUpdate = toDoLists[id]
        setToDoLists({
          ...toDoLists,
          [id]: { ...listToUpdate, todos }
        })
      }}
    />}

      <Button onClick={ () => postNewTodoList(
        {
          id: 3, 
          title: 'hey', 
          todos: ['yeah']
        }
      ) }>

        Add todo
      </Button>

  </Fragment>
}

/* TO DO
  * MAIN TASK * 
    - When "add todo" (now generated hard coded -> make user insert data)
      - Open up "Add title"
      - Open up "Add tasks" (maybe)
      - Add "add" button

    - Add styling "Add todo" button
    - Add general UX & styling 

    - (MAYBE) When have pressed specific "todo" from todo-list, and press "save" -> collapse list item

  * ADDITIONAL TASKS * 
    1. Autosave when added task
    2. Add date for completion to todo items -> indicate remaining time / overdue 
    3. (Make it possible to) indicate that a todo is completed
    4. Indicate that todolist is completed if all todo items within are completed
*/
