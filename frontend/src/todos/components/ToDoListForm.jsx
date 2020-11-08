import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Checkbox, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

// *** AUTOSAVE
  // * why does it delete some letters? --> it sends and then deletes and write them out again --> maybe due to value = todoItem.content ? 

// *** MARK TODO ITEMS AS "DONE"
  // * + overline & opacity
  // * other checked colour 

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

// toDoList NOT toDoList(s)
export const ToDoListForm = ({ toDoList, saveToDoList, fetchData }) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)

  const saveTodoItem = (toDoListId, todos) => { // saveTodoItems!
    fetch(`http://localhost:3001/todo/${toDoListId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        todos: todos
      })
    }).then(response => {
        return response.json(); 
      })
      .then(setTodos) // servern uppdaterad, nu todos uppdateras hos clienten
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

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
  }

  const handleCheckChange = (checkBoxStatus, todoItem) => {
    todoItem.complete = checkBoxStatus; 
    setTodos(todos); 
    saveTodoItem(toDoList.id, todos)
  }

  useEffect(() => {
    console.log('render');
  }, [todos])

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((todoItem, index) => ( 
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                checked={todoItem.complete}
                onChange={e => { handleCheckChange(e.target.checked, todoItem) }}
                inputProps={{ color: 'secondary' }}
              />
              <TextField
                label='What to do?'
                value={todoItem.content}
                className={classes.textField}

                onChange={event => {
                  let selectedItem = todos[index]
                  selectedItem["content"] = event.target.value;
                  todos[index] = selectedItem;
                  setTodos([...todos])

                  /* 
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1)
                  ])
                  */

                  saveTodoItem(toDoList.id, todos)
                  fetchData()
                }}
              />
              <Button // delete todo (trash) button 
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
            <Button // add todo (+) button
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
