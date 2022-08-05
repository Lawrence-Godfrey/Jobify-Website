// noinspection JSCheckFunctionSignatures

import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from './reducer'
import { DISPLAY_ALERT, CLEAR_ALERT, REGISTER_USER_BEGIN, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS } from "./actions";


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    token: null,
    userLocation: '',
}

const AppContext = React.createContext({})

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })

        try {
            const response = await axios.post('/api/auth/register', currentUser)
            const { user, token, location } = response.data;
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location } })
        } catch (error) {
            console.log(error)
            dispatch({
                type: REGISTER_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                    status: error.response.data.status,
                    errors: error.response.data.errors
                }
            })
        }

        clearAlert()
    }

    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser }}>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
};

export { AppProvider, initialState, useAppContext }