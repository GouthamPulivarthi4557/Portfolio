import { createContext, useContext } from 'react'

/**
 * true once the intro has finished (or was never shown). Lets the hero hold its
 * entrance animation until the intro is gone instead of playing it unseen.
 */
export const IntroDoneContext = createContext(true)

export const useIntroDone = () => useContext(IntroDoneContext)
