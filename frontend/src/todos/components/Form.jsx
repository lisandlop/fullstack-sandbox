import React, { Fragment, useState, useEffect } from 'react'
import { TextField, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
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

// const theme = createMuiTheme({
//     typography: {
//         fontFamily: '"Space Grotesk", sans-serif'
//     },
// });

export const Form = ( {inputValue, setInputValue, todoList, setTodoList, postNewTodoList} ) => {
    const classes = useStyles();
    const handleSubmitTodo = e => {
        e.preventDefault();
        if (!inputValue) {
            console.log("no input value");
            return;
        }
        let uniqueId = uuid.v4(); 

        ///// BEHÖVER INTE DETTA NEDAN
        setTodoList([
            ...todoList, {
                [uniqueId]: {
                    id: [uniqueId],
                    title: inputValue,
                    todos: [], 
                    completed: false
                }
            }
        ])
        ///// BEHÖVER INTE DETTA OVAN

        postNewTodoList({
                id: [uniqueId],
                title: inputValue,
                todos: [], 
                completed: false
        })
        window.location.reload(); 
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
                        // console.log(event.target.value);
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