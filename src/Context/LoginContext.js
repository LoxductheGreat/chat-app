import { createContext, useContext, useState } from 'react'

export const LoginContext = createContext(null)

export const LoginProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  return (
    <LoginContext.Provider value={{ token, setToken }}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLogin = () => useContext(LoginContext)
