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
export const ToDoListForm = ({ toDoList, saveToDoList }) => {
  // toDoList = the selected, active, todo list 
  // saveToDoList = function to save toDoList new todo items
  const classes = useStyles()
  const [todos, setTodos] = useState(toDoList.todos)

  const putNewTodoItem = async (toDoListId, todos) => { // saveTodoItems!
    fetch(`http://localhost:3001/todo/${toDoListId}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        todos: todos
      })
    }).then(response => {
        console.log(response);
        //console.log(todos);
        return response.json(); 
      })
      .then(setTodos) // servern uppdaterad, nu todos uppdateras hos clienten
      .catch(e => {
        console.log("ERROR: " + e);
        console.error(e)
      });
  }

  const deleteTodoitem = async (toDoListId, todoItem) => {
    fetch(`http://localhost:3001/todo/${toDoListId}/`, {
     method: "DELETE",
       headers: { "Content-Type": "application/json; charset=utf-8" },
       body: JSON.stringify({
         todo: todoItem
       })
     }).then(response => {
        console.log(response);
        //console.log(todos);
        return response.json(); 
      })
      .then(setTodos) // servern är uppdaterad och nu ska todos uppdateras hos clienten
      .catch(e => {
        console.log("ERROR: " + e);
        console.error(e)
      });
  }

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

  useEffect(() => {
  }, [])

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
                {/* {console.log('todoItem ', todoItem)} */}
              </Typography>
              <Checkbox
                // checked={todoItem.completed}
                onChange={e => { handleCheckChange(e.target.checked, todoItem) }}
                // inputProps={{ color: 'primary checkbox' }}
              />
              <TextField
                label='What to do?'
                value={todoItem.content}

                // onInput={event => {
                //   let selectedItem = todos[index]
                //   selectedItem["content"] = event.target.value;
                //   todos[index] = selectedItem;
                //   setTodos([...todos]) //setTodo({...myobj})
                //   putNewTodoItem(toDoList.id, todos)
                // }}

                onChange={event => {
                  // console.log(event.target.value);
                  let selectedItem = todos[index]
                  console.log('selectedItem first: ', selectedItem);
                  selectedItem["content"] = event.target.value;
                  console.log('selectedItem after: ', selectedItem);
                  todos[index] = selectedItem;
                  setTodos([...todos]) //setTodo({...myobj})
                  console.log(todos);
                  putNewTodoItem(toDoList.id, todos)

                  // onLeave
                  // save: putNewTodoItem(toDoList.id, todos) // BEHÖVER LÄGGA TILL ID
                  // istället kan bygga en save endpoint 

                  // ha kvar save button + ny funktion autoSave som save auto 

                }}
                className={classes.textField}
              />

              <Button // delete (trash) button 
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={ () => {
                  // setTodos([ // immutable delete
                  //   ...todos.slice(0, index),
                  //   ...todos.slice(index + 1)
                  // ])
                  deleteTodoitem(toDoList.id, todoItem)
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
                setTodos([...todos, {id: todos.length + 1, content: '', complete: false}]) // lägger till en ny tom "" i arrayen (ny item)
              }}
            >
              Add Todo <AddIcon />
            </Button>
            {/* <Button type='submit' variant='contained' color='primary' */}
            <Button variant='contained' color='primary'
              onClick={() =>{
                putNewTodoItem(toDoList.id, todos) // BEHÖVER LÄGGA TILL ID
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
