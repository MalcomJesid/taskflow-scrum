import { useState } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || '')

  const handleSave = () => {
    if (!title.trim()) return
    onUpdate(todo.id, { title: title.trim(), description: description.trim(), completed: todo.completed })
    setEditing(false)
  }

  const handleCancel = () => {
    setTitle(todo.title)
    setDescription(todo.description || '')
    setEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {editing ? (
        <div className="todo-edit">
          <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripcion" />
          <div className="todo-edit-actions">
            <button className="btn-save" onClick={handleSave}>Guardar</button>
            <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <div className="todo-text">
            <span className="todo-title">{todo.title}</span>
            {todo.description && <span className="todo-desc">{todo.description}</span>}
          </div>
          <div className="todo-actions">
            <button className="btn-edit" onClick={() => setEditing(true)}>Editar</button>
            <button className="btn-delete" onClick={() => onDelete(todo.id)}>Eliminar</button>
          </div>
        </>
      )}
    </li>
  )
}
