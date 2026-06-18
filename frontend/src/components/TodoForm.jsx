import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title: title.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titulo de la tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Descripcion (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">+ Agregar</button>
    </form>
  )
}
