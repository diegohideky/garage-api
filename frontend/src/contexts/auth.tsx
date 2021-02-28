import React, { createContext, useState, useMemo, useEffect } from 'react'
import publicIP from 'react-native-public-ip'

const AuthContext = createContext(null)

const AuthProvider: React.FC = ({ children }) => {
  const [ip, setIp] = useState<string | null>(null)
  const value = useMemo<any>(() => ({ ip }), [ ip ])

  useEffect(() => {
    const getIP = async () => {
      try {
        const payload: string = await publicIP()
        setIp(payload)
      } catch (error) {
        console.log({ error })
      }
    }

    getIP()
  }, [ip])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
