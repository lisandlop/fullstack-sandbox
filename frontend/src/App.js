import React, { Component } from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import { makeStyles } from '@material-ui/core/styles';

import { ToDoLists } from './todos/components/ToDoLists'

// const useStyles = makeStyles((theme) => ({
//   text: {
//       fontFamily: 'Space Grotesk, sans-serif'
//   },
//   color: '#0662c8'
// }));

const MainAppBar = () => {
  // const classes = useStyles();
  return <AppBar position='static' color='primary'>
    <Toolbar>
      <Typography variant='h6' color='inherit'>
        Things to do
      </Typography>
    </Toolbar>
  </AppBar>
}

const mainWrapperStyle = { display: 'flex', flexDirection: 'column' }
const centerContentWrapper = { display: 'flex', justifyContent: 'center' }
const contentWrapperStyle = { display: 'flex', flexDirection: 'column', maxWidth: '80rem', flexGrow: 1 }
const MainWrapper = ({ children }) => {
  return <div style={mainWrapperStyle}>
    <MainAppBar />
    <div style={centerContentWrapper}>
      <div style={contentWrapperStyle}>
        {children}
      </div>
    </div>
  </div>
}

class App extends Component {
  render () {
    return <MainWrapper>
      <ToDoLists
        style={{ margin: '1rem' }}
      />
    </MainWrapper>
  }
}

export default App

// NÄR BLIR [OBJECT OBJECT] --> OFTA FÖR LOGGAR MED KOMMENTAR INNAN LOL

// VARIABLER / HOOKS
/*
///// ///// ///// ///// /////
*** USESTATE

 ** ToDoLists.jsx
  * toDoLists (setToDoLists) = useState({})
    - toDoLists är objekt med varje todo list som objekt inuti
    - består av key: id & value: objekt med id, title, todos, completed
    - setToDoLists sätter toDoLists
  * activeList (setActiveList) = useState()
    - activeList är den todo list vi har tryckt in oss i
    - innerhåller endast key (id) av todo list (e.g. 0000001)
    - toDoLists[activeLists] är datan från todo list med id "activeLists"

 ** ToDoListForm.jsx
  * todos (setTodos) = useState(toDoList.todos)
    - specifika todo list (active list) todos
    - vi vill alltså sätta ...todos + nya todos när lägger till
    - och att servern sparar ändringarna ...todos + nya todos 

 ** Form.jsx
  * inputValue (setInputValue) = useState("")

///// ///// ///// ///// /////
*** PROPS

 ** ToDoLists.jsx

  * PROP TO ToDoListForm.jsx!
  *** toDoList (NO S) --> prop to ToDoListForm.jsx
    - toDoList={toDoLists[activeList]} -> todo item med id samma som activelist

  *** saveToDoLists --> prop to ToDoListForm.jsx
    - takes in "ID" & "TODOS" (set in ToDoListForm)!!! 
    * listToUpdate = toDoLists[id] 
      - är list object in toDoLists med id't som skickas in 
    - Sätter toDoLists genom setToDoLists 
      - Tar in ...toDoLists, 
      - Går till list item object med id [id], 
      - Lägger in ...listToUpdate och merge med todos (de som skickas in genom func)
  - KANSKE HÄR JAG SKA KALLA PÅ PUT??? 

  * PROP TO Form.jsx!
  *** toDoLists={toDoLists} --> list with all toDoLists (state)
  *** setToDoLists={setToDoLists} --> function to set toDoLists
  *** postNewTodoList={postNewTodoList} --> POST request to post new todo list to server

*/



