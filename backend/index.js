const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Moved data to backend from "ToDoList.jsx"
let initialData = {
    '0000000001': {
        id: '0000000001',
        title: 'First List',
        todos: ['First todo of first list!'], 
        // todos: [
        //     {
        //         content: 'First todo of first list!', 
        //         complete: false
        //     }, 
        //     {
        //         content: 'Seconddd', 
        //         complete: false
        //     }
        // ], 
        completed: false
    },
}

const PORT = 3001

app.get('/todo', (req, res) => res.send(initialData))
app.post('/todo', (req, res) => {
    initialData = {...initialData, ...req.body}
    res.send(initialData)
})
// app.put("/todo/:id/", (req, res) => {
//     const requestId = req.params.id;
//     console.log('requestId: ', requestId);
//     console.log('req.body.todos: ', req.body.todos); // is an array [data: {}]
//     let currentObject = Object.entries(initialData).filter(list => {
//         console.log('list: ', list);
//         console.log('list[0]: ', list[0]);
//       return list[0] === requestId;
//       // för varje todolist object i initialData
//       // gå igenom varje todolist (list)
//       // och se om list.id === requestId
//     })[0];
    
//     console.log('currentObject: ', currentObject); // undefined 
//     const index = Object.entries(initialData).indexOf(currentObject);
//     req.body.todos.forEach(element => {
//         console.log('element: ' + req.body.todos.indexOf(element)); // 0 
//         let elementId = req.body.todos.indexOf(element); 
//         currentObject[elementId] = req.body.todos[elementId];
//     });
//     initialData[index] = currentObject;
//     res.json(initialData[index]);

//     // const keys = Object.keys(req.body);
//     // keys.forEach(key => {
//     //     currentObject[key] = req.body[key];
//     // });
//     // initialData[index] = currentObject;
//     // res.json(initialData[index]);

// });

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))