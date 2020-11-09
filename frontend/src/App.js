import React, { Component } from 'react'
import './App.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import { createMuiTheme } from '@material-ui/core/styles';

import { ToDoLists } from './todos/components/ToDoLists'

// const font =  "'Space Grotesk', sans-serif";
// const theme = createMuiTheme({
//   typography: {
//     fontFamily: font,
//   }
// });

const MainAppBar = () => {
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

/* TO DO

  * UX and design (learn more about Material UI)
  * Delete entire todo list (+ confirm modal "are you sure?")
  * Be able to change name of todo list 
  
  * Sellpy colors & font
    - Sellpy blue: #0662c8
    - Sellpy font: "Space Grotesk" & "Ballinger"
  * Text decoration: overline & opacity: 0.5 when checked 
  
  * Debug todo item form input
    - Right now not allowed to type too fast -> deletes input field and type in again by itself (slow)
    - May be problem with value={todoItem.content} (line 105, ToDoListForm.jsx)

*/
