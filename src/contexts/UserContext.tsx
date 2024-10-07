import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

interface User extends FirebaseUser {
  favorites?: string[]
}

interface UserContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  createAccount: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  addToFavorites: (mangaId: string) => Promise<void>
  removeFromFavorites: (mangaId: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        const userData = userDoc.data()
        setUser({ ...firebaseUser, favorites: userData?.favorites || [] })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  const createAccount = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = userCredential
      if (user) {
        await setDoc(doc(db, 'users', user.uid), { email: user.email }, { merge: true })
      }
    } catch (error: any) {
      console.error('Error creating account:', error)
      throw error
    }
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const { user } = result
      if (user) {
        await setDoc(doc(db, 'users', user.uid), { email: user.email }, { merge: true })
      }
    } catch (error: any) {
      console.error('Error signing in with Google', error)
      throw error
    }
  }

  const logout = () => signOut(auth)

  const addToFavorites = async (mangaId: string) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      await setDoc(userRef, {
        favorites: [...(user.favorites || []), mangaId]
      }, { merge: true })
      setUser({ ...user, favorites: [...(user.favorites || []), mangaId] })
    }
  }

  const removeFromFavorites = async (mangaId: string) => {
    if (user) {
      const userRef = doc(db, 'users', user.uid)
      const updatedFavorites = user.favorites?.filter(id => id !== mangaId) || []
      await setDoc(userRef, { favorites: updatedFavorites }, { merge: true })
      setUser({ ...user, favorites: updatedFavorites })
    }
  }

  return (
    <UserContext.Provider value={{ user, login, createAccount, loginWithGoogle, logout, addToFavorites, removeFromFavorites }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}