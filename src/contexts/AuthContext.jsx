import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth'
import { auth } from '../firebase/config'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const googleProvider = new GoogleAuthProvider()

  // Register with email and password
  const register = async (name, email, password, photoURL) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, {
        displayName: name,
        photoURL: photoURL || 'https://i.pravatar.cc/150?img=3'
      })
      toast.success('Account created successfully!')
      return result.user
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  // Login with email and password
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      toast.success('Logged in successfully!')
      return result.user
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      toast.success('Logged in successfully!')
      return result.user
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  // Logout
  const logout = async () => {
    try {
      await signOut(auth)
      toast.success('Logged out successfully!')
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}