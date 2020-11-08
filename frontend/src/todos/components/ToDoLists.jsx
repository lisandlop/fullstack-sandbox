import React, { Fragment, useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
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

  // Set data once
  const fetchData = () => {
    fetch("http://localhost:3001/todo")
    .then(response => {
      return response.json(); 
    })
    .then(setToDoLists)
    .catch(err => {
      console.log(err);
    })
  }
  useEffect(() => {
    fetchData()
  }, [])

  // Posts/adds new todo list 
  const postNewTodoList = ({id, title, todos, completed}) => {
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
      return response.json(); 
    })
    .then(setToDoLists)
  }

  if (!Object.keys(toDoLists).length) return null
  return <Fragment>
    <Card style={style}>
      <CardContent style={{fontFamilty: 'Space Grotesk'}}>
        <Typography component='h2'>
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
      key={activeList}
      toDoList={toDoLists[activeList]}
      saveToDoList={(id, { todos }) => {
        console.log('todos: ', todos);
        const listToUpdate = toDoLists[id]
        setToDoLists({
          ...toDoLists, 
          [id]: { ...listToUpdate, todos }
        })
      }}
      fetchData={fetchData}
    />}

    <Form 
      toDoLists={toDoLists} 
      setToDoLists={setToDoLists} 
      postNewTodoList={postNewTodoList}
    />
  </Fragment>
}
