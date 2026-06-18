export default function TodoFilter({ filter, onChange }) {
  return (
    <div className="todo-filter">
      <button className={filter === 'all' ? 'active' : ''} onClick={() => onChange('all')}>Todas</button>
      <button className={filter === 'pending' ? 'active' : ''} onClick={() => onChange('pending')}>Pendientes</button>
      <button className={filter === 'completed' ? 'active' : ''} onClick={() => onChange('completed')}>Completadas</button>
    </div>
  )
}
