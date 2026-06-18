import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:8080/api/todos' })

export const getAll = (completed) => {
  const params = completed !== undefined ? { completed } : {}
  return API.get('', { params })  // ← sin la barra
}

export const getById = (id) => API.get(`/${id}`)
export const create = (todo) => API.post('', todo)  // ← sin la barra
export const update = (id, todo) => API.put(`/${id}`, todo)
export const toggle = (id) => API.patch(`/${id}/toggle`)
export const remove = (id) => API.delete(`/${id}`)
