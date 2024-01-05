import { useReducer } from "react";
import { createContext } from "react";


export const ContextStyle = createContext()

export const ContextStyleProvider = ({children}) => {

    const INITAL_STATE = { change : false}

    const reducerState = (state, action) => {
        switch(action.type) {
            case 'CHANGE_TRUE' : {
                return {
                    ...state,
                    change : true
                }
            }
            case 'CHANGE_FALSE' : {
                return {
                    ...state,
                    change : false
                }
            }
            default : {
                state
            }
        }
    }

    const [ changeInterfaceState , dispatch ] = useReducer(reducerState, INITAL_STATE)


    return (
        <ContextStyle.Provider value={{changeInterfaceState, dispatch}} >{children}</ContextStyle.Provider>
    )
}