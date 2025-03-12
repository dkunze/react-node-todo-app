const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json()) // For parsing JSON request bodies

let todos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Learn Node.js', completed: false },
]

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos)
})

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body
  const newTodo = { id: todos.length + 1, text, completed: false }
  todos.push(newTodo)
  res.status(201).json(newTodo)
})

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params
  const { text, completed } = req.body

  let todo = todos.find((todo) => todo.id === parseInt(id))
  if (todo) {
    todo.text = text || todo.text
    todo.completed = completed !== undefined ? completed : todo.completed
    res.json(todo)
  } else {
    res.status(404).send('Todo not found')
  }
})

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params
  todos = todos.filter((todo) => todo.id !== parseInt(id))
  res.status(204).end()
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
