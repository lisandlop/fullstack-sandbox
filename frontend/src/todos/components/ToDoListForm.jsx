import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { TextField, Card, CardContent, CardActions, Checkbox, Button, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'

// *** SAVE TODO LIST ITEM ON CHANGE (AUTOSAVE)
  // * onChange? 
  // * useEffect? 
// *** MARK TODO ITEMS AS "DONE"
  // * make check/not check (true/false) logic
  // * + overline & opacity

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

// toDoList NOT toDoLists
export const ToDoListForm = ({ toDoList, saveToDoList, 
  // putNewTodoItem 
}) => {
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)

  console.log(`todos: ${todos}`);
  console.log(`todoList: ${toDoList.todos}`);

  const handleSubmit = event => {
    event.preventDefault()
    saveToDoList(toDoList.id, { todos })
    // putNewTodoItem(toDoList.id, todos)
  }

  // NOT WORKING YET
  const handleCheckChange = (checkedStatus, todoItem) => {

    console.log("INSIDE CHANGE TODOS: " + todos);
    console.log('todoItem: ', todoItem);
    console.log('checkedStatus: ', checkedStatus);

    setTodos(todos.map(
      (item) => {
        console.log(item.id);
        console.log(todoItem.id);
        if (item.id === todoItem.id) {
          console.log("SAAAME " + item.id);
          return {
            ...item, completed: !item.completed
          }
        }
        console.log(item);
        return item; 
      })
    ); 

    // console.log("YEAH TODOS: " + todos);
    // console.log('todoItem: ', todoItem);
    // console.log('checkedStatus: ', checkedStatus);
    // // set todoItem.completed = !todoItem.completed
    // if (!todoItem) {
    //   console.log('no todoitem');
    //   return;
    // }
    // console.log('todoList.comp.B: ', toDoList.completed);
    // toDoList.completed = checkedStatus;

    // todoItem.completed = checkedStatus;
    // setTodos(todos);
    // console.log('todos NO YEAH: ', todos);
    // console.log('todoList.comp.A: ', toDoList.completed);

    // if (toDoList.completed === !checkedStatus) return; 
    // if (checkedStatus === true) {
    //   console.log("TRUE");
    //   // styling grey/overling
    // } else {
    //   console.log("FALSE");
    //   // styling back 
    // }

    saveToDoList(toDoList.id, { todos })
    // putNewTodoItem(toDoList.id, todos)
  }

  // id är todoList id
  // todos är array med todo items
  // const putNewTodoItem = (id, todos) => {
  //   console.log('todos: ', todos);
  //   console.log('id: ', id);
  //   fetch(`http://localhost:3001/todo/${id}/`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json; charset=utf-8" },
  //     body: JSON.stringify({
  //       todos: todos 
  //     })
  //   }).then(response => {
  //       console.log(response);
  //       console.log("todos: " + todos);
  //       return response.json(); 
  //     })
  //     .then(setTodos) // sätt ny toDoLists och uppdatera server
  //     // .then(setTodos)
  //     .catch(e => {
  //       console.log("ERROR: " + e);
  //       console.error(e)
  //     });
  // }

  useEffect(() => {
    
  }, [])

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component='h2'>
          {toDoList.title}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {/* {!todos ? 'nothing here' : 'very much here'}
          {console.log('todos: ', todos)} */}
          {todos.map((todoItem, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='h6'>
                {index + 1}
              </Typography>
              <Checkbox
                // checked={todoItem.completed}
                onChange={e => 
                  {
                    // console.log(todoItem);
                    // console.log(index);
                    handleCheckChange(e.target.checked, todoItem)
                  }
                }
                // inputProps={{ color: 'primary checkbox' }}
              />
              <TextField
                label='What to do?'
                value={todoItem}
                onChange={event => {
                  console.log(event.target.value);
                  setTodos([ // immutable update
                    ...todos.slice(0, index),
                    event.target.value,
                    ...todos.slice(index + 1)
                  ])
                }}
                className={classes.textField}
              />
              <Button // delete (trash) button 
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([ // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1)
                  ])
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
                setTodos([...todos, ''])
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type='submit' variant='contained' color='primary'
              // onClick={() =>{
              //   putNewTodoItem(toDoList.id, todos)
              // }}
            >
              
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
