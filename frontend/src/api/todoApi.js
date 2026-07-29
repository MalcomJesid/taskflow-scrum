import axios from 'axios'
import { supabase } from '../lib/supabaseClient'

const API = axios.create({ baseURL: 'http://localhost:8080/api/todos' })

API.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getAll = (completed) => {
  const params = completed !== undefined ? { completed } : {}
  return API.get('', { params })
}

export const create = (todo) => API.post('', todo)
export const update = (id, todo) => API.put(`/${id}`, todo)
export const toggle = (id) => API.patch(`/${id}/toggle`)
export const remove = (id) => API.delete(`/${id}`)
