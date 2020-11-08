const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

// fix delete
// fix autosave

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Moved data to backend from "ToDoList.jsx"
let initialData = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        // todos: ['First todo of first list!'], 
        todos: [
            {
                id: 1, 
                content: 'First todo of first list!', 
                complete: false
            }, 
            {
                id: 2, 
                content: 'Seconddd', 
                complete: false
            }
        ], 
        completed: false
    },
}

const PORT = 3001

app.get('/todo', (req, res) => res.send(initialData))
app.post('/todo', (req, res) => {
    console.log('initialData: ', initialData);
    initialData = {...initialData, ...req.body}
    console.log('initialData: ', initialData);
    res.send(initialData)
})
app.put("/todo/:id", (req, res) => {
    try {
        const reqId = req.params.id;
        if (initialData[reqId] != undefined) {
            initialData[reqId].todos = req.body.todos;
            console.log(initialData)
            console.log(initialData[reqId].todos)
            res.send(initialData[reqId].todos);
        }
        else {
            res.status(404).json({message: "Object not found"})
        }
    }
    catch(error) {
        res.status(500).json(error)
    }
});

app.delete("/todo/:id", (req, res) => {

    /*
        * input from frontend: req.body.todo (the todo item to delete)
        * the server data: initialData[reqId].todos 
        * want to check:
            - if req.body.todo.id == initialData[reqId].todos (map) .id
            --> THEN DELETE FROM SERVER DATA
            + check if 
    */

    try {
        const reqId = req.params.id;
        console.log('///// ///// /////');
        console.log(initialData[reqId].todos);
        console.log(req.body.todo) // --> den todo/item vi trycker på 
        //let item = initialData[reqId].todos.filter(d => d['id'] == req.body.todo.id)
        let itemList = initialData[reqId].todos.map( item => item['id'])
        console.log('itemList before: ' + itemList) // --> id's av hela todo list
        let index = itemList.indexOf(req.body.todo.id + 1)
        console.log('index outside if before: ', index); // --> vald todo id

        if (index != -1 && req.body.todo.id == index) {
            console.log("req id: " + req.body.todo.id);
            console.log("index: " + index);
            console.log("THE SAME!");
            initialData[reqId].todos.splice(req.body.todo.id - 1, 1); 
        }

        // if(index != -1) {

        //     console.log('index inside if: ', index); // --> samma id/index
        //     console.log('delete')
        //     itemList.splice(index, 1); 
        //     console.log('itemList inside after: ' + itemList ); // --> 

        //     // lista, delete object om vet index i listan
        //     // initialData[reqId].todos = req.body.todo; 

        //     // vill delete req.body.todo från initialData[reqId].todos
        // }
        // console.log('index outside if after: ', index);
        // console.log('itemList after: ' + itemList );
        console.log(initialData[reqId].todos);
        res.send(initialData[reqId].todos)
    }
    catch(error) {
        res.status(500).json(error)
    }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))