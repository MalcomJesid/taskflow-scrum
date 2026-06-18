import { useEffect, useState } from 'react'
import { getAll, create, toggle, remove, update } from './api/todoApi'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'

export default function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchTodos = async (currentFilter) => {
    try {
      setLoading(true)
      const completed =
        currentFilter === 'completed' ? true :
        currentFilter === 'pending' ? false :
        undefined
      const res = await getAll(completed)
      setTodos(res.data)
      setError(null)
    } catch {
      setError('No se pudo conectar con el servidor.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTodos(filter) }, [filter])

  const handleAdd = async (todo) => {
    try {
      await create(todo)
      fetchTodos(filter)
    } catch {
      setError('Error al crear la tarea.')
    }
  }

  const handleToggle = async (id) => {
    try {
      await toggle(id)
      fetchTodos(filter)
    } catch {
      setError('Error al actualizar la tarea.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await remove(id)
      fetchTodos(filter)
    } catch {
      setError('Error al eliminar la tarea.')
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      await update(id, data)
      fetchTodos(filter)
    } catch {
      setError('Error al editar la tarea.')
    }
  }

  const pending = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>Lista de Tareas</h1>
        <span className="badge">{pending} pendiente{pending !== 1 ? 's' : ''}</span>
      </header>

      <TodoForm onAdd={handleAdd} />
      <TodoFilter filter={filter} onChange={setFilter} />

      {error && <div className="error-msg">{error}</div>}

      {loading ? (
        <p className="loading">Cargando...</p>
      ) : todos.length === 0 ? (
        <p className="empty">No hay tareas en esta categoria.</p>
      ) : (
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
