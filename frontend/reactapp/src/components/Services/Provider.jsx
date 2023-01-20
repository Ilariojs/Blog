import React from 'react'
import  Context  from './Context'
import useStorage from '../../utils/useStorage'

const StoreProvider = ({ children }) => {

    const [token, setToken] = useStorage('token')
    const [loggedName, setLoggedName] = useStorage('')
    const [loggedEmail, setLoggedEmail] = useStorage('')
    const [loggedPassword, setLoggedPassword] = useStorage('')
    const [loggedAccess_id, setLoggedAccess_id] = useStorage('')
    const [loggedId, setLoggedId] = useStorage('')
    return(
        <Context.Provider
            value={{
                token,
                setToken,
                loggedName,
                setLoggedName,
                loggedEmail,
                setLoggedEmail,
                loggedPassword, 
                setLoggedPassword,
                loggedAccess_id, 
                setLoggedAccess_id,
                loggedId, 
                setLoggedId
            }}>
                {children}
        </Context.Provider>
        )
    }


export default StoreProvider