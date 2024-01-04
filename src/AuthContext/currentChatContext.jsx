import { createContext, useReducer } from "react";

export const  CurrentChatContext = createContext()

export const  CurrentChatProvider = ({children}) => {

    const INITIAL_STATE = {
        user : {}
    }

    const reducerChatCurrent = (state, action) => {
        switch(action.type){
            case 'CHANGE_USER' : 
                return {
                    user : action.payload
                }
            default : 
                return state
        }
    }

    const [ state, dispatch ] = useReducer(reducerChatCurrent , INITIAL_STATE)

    return <CurrentChatContext.Provider value={{dispatch, state }}>{children}</CurrentChatContext.Provider>
}