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
        todos: ['First todo of first list!']
    },
    '0000000002': {
        id: '0000000002',
        title: 'Second List',
        todos: ['First todo of second list!']
    }
}

const PORT = 3001

app.get('/todo', (req, res) => res.send(initialData))
app.post('/todo', (req, res) => {
    initialData = {...initialData, ...req.body}
    console.log(initialData)
    res.send(initialData)

    // console.log('initialData: ', initialData);
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))

// useeffect react 
// usestate react

// inline css -> inuti html
// lägga in tasks i en lista (checkbox när klar)
