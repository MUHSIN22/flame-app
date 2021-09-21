import React, { createContext, useState } from 'react'
export const EssentialContext = createContext()

export function EssentialProvider({children}) {
    const [essentials,setEssentials] = useState(null)
    return (
        <EssentialContext.Provider value={[essentials,setEssentials]}>
            {children}            
        </EssentialContext.Provider>
    )
}
