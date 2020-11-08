const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let initialData = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: [
            {
                id: 1, 
                content: 'First todo of first list!', 
                complete: false
            }, 
            {
                id: 2, 
                content: 'Second todo item', 
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
    try {
        const reqId = req.params.id;
        let itemList = initialData[reqId].todos.map( item => item['id'])
        let index = itemList.indexOf(req.body.todo.id)
        if (index != -1) {
            initialData[reqId].todos.splice(index, 1); 
        }
        res.send(initialData[reqId].todos)
    }
    catch(error) {
        res.status(500).json(error)
    }
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))