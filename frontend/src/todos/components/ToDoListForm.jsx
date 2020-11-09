import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Checkbox, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

export const ToDoListForm = ({ toDoList, saveToDoList, fetchData }) => {
  // toDoList NOT toDoList(s)
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)

  const saveTodoItem = (toDoListId, todos) => {
    fetch(`http://localhost:3001/todo/${toDoListId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        todos: todos
      })
    }).then(response => {
        return response.json(); // servern uppdateras
      })
      .then(setTodos) // todos uppdateras hos clienten
      .catch(e => {
        console.error(e)
      });
  }
  const deleteTodoitem = (toDoListId, todoItem) => {
    fetch(`http://localhost:3001/todo/${toDoListId}/`, {
      method: "DELETE",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({
          todo: todoItem
        })
      }).then(response => {
        return response.json(); 
      })
      .then(setTodos)
      .catch(e => {
        console.error(e)
      });
  }

  const submitHandler = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
  }
  const checkboxHandler = (checkBoxStatus, todoItem) => {
    todoItem.complete = checkBoxStatus; 
    setTodos(todos); 
    saveTodoItem(toDoList.id, todos)
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={submitHandler} className={classes.form}>
          {todos.map((todoItem, index) => ( 
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                checked={todoItem.complete}
                onChange={e => { 
                  checkboxHandler(e.target.checked, todoItem) 
                }}
                style={{color: 'green'}}
              />
              <TextField
                label='What to do?'
                value={todoItem.content}
                className={classes.textField}
                onChange={event => {
                  /* onChange not quite working correctly */
                  let selectedItem = todos[index]
                  selectedItem["content"] = event.target.value;
                  todos[index] = selectedItem;
                  setTodos([...todos])
                  saveTodoItem(toDoList.id, todos)
                  fetchData()
                }}
              />
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={ () => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
                  deleteTodoitem(toDoList.id, todoItem)
                  fetchData()
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => {
                setTodos([...todos, {id: todos.length + 1, content: '', complete: false}])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'
              onClick={() =>{
                saveTodoItem(toDoList.id, todos)
              }}
            >
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
