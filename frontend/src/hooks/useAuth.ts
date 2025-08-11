import { useEffect, useState } from 'react'
import { api, setAuthToken } from '../services/api'

/**
 * Hook to manage admin auth state using localStorage token.
 */
export function useAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('adminToken'))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

  useEffect(() => {
    setAuthToken(token)
    setIsAuthenticated(!!token)
    if (token) localStorage.setItem('adminToken', token)
    else localStorage.removeItem('adminToken')
  }, [token])

  async function login(email: string, password: string) {
    const { data } = await api.post('/admin/login', { email, password })
    const tokenFromApi = data?.data?.token || data?.token
    setToken(tokenFromApi)
    return data
  }

  async function logout() {
    try { await api.post('/admin/logout') } catch {}
    setToken(null)
  }

  return { token, isAuthenticated, login, logout }
}





