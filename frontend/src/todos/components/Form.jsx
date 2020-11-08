import React, { Fragment, useState } from 'react'
import { TextField, Card, CardContent, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import uuid from 'uuid'; 

const useStyles = makeStyles((theme) => ({
    card: {
        flexGrow: 1,
        margin: '1rem 5rem 0rem 5rem', 
        // padding: '1rem', 
        fontFamily: 'Roboto'
    },
    content: {
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        alignItems: 'center', 
    }, 
    addBtn: {
        marginTop: '1rem'
    }, 
    plusBtn: {
        fontSize: '60px', 
        color: '#0662c8'
    }, 
    form: {
        display: 'flex',
        flexDirection: 'column', 
    }
}));

export const Form = ( {toDoLists, setToDoLists, postNewTodoList} ) => {
    const [inputValue, setInputValue] = useState(""); // input value in "add todos"

    const classes = useStyles();

    const handleSubmitTodo = e => {
        e.preventDefault();
        if (!inputValue) {
            console.log("No input todo list value");
            return;
        }
        let uniqueId = uuid.v4(); 
        setToDoLists([
            ...Object.entries(toDoLists), { 
                [uniqueId]: {
                    id: [uniqueId],
                    title: inputValue,
                    todos: [], 
                    completed: false
                }
            }
        ])
        postNewTodoList({
            id: uniqueId,
            title: inputValue,
            todos: [], 
            completed: false
        })
        setInputValue(""); 
    }

    return (
        <Fragment>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                <Typography component='h2'>
                    Add Todo List
                </Typography>
                    <TextField
                    label='Add Todo List'
                    placeholder='Todo List Name'
                    value={inputValue}
                    onChange={event => {
                        setInputValue(event.target.value)
                    }}
                    />
                    <form onSubmit={ handleSubmitTodo } className={classes.form}>
                        <Button className={classes.addBtn} color="primary" type="submit">
                            <AddCircleIcon className={classes.plusBtn}/>
                        </Button>
                    </form>
               </CardContent>
            </Card>
        </Fragment>        
    )
}