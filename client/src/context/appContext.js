// noinspection JSCheckFunctionSignatures

import React, { useReducer, useContext } from "react";
import axios from "axios";
import reducer from './reducer'
import {
    DISPLAY_ALERT,
    CLEAR_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_ERROR,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_BEGIN,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
} from "./actions";


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const location = localStorage.getItem('location')


const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: location ? location : '',
    showSidebar: false
}

const AppContext = React.createContext({})

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const authFetch = axios.create({
        baseURL: '/api',
        headers: {
            Authorization: `Bearer ${state.token}`
        }
    })

    // Interceptors
    // Request Interceptor
    authFetch.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${state.token}`
        return config
    }, (error) => {
        return Promise.reject(error)
    })

    // Response Interceptor
    authFetch.interceptors.response.use((response) => {
        return response
    }, (error) => {
        if (error.response.status === 401) {
            logoutUser()
        }
        return Promise.reject(error)
    })

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT })
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const addUserToLocalStorage = ({ user, token }) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        }
        if (token) {
            localStorage.setItem('token', token)
        }
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN })

        try {
            const response = await axios.post('/api/auth/register', currentUser)
            const { user, token } = response.data;
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token } })
            addUserToLocalStorage({ user, token })
        } catch (error) {
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

    const loginUser = async (currentUser) => {
        dispatch({ type: LOGIN_USER_BEGIN })

        try {
            const response = await axios.post('/api/auth/login', currentUser)
            const { user, token } = response.data;
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } })
            addUserToLocalStorage({ user, token })
        } catch (error) {
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                    status: error.response.data.status,
                    errors: error.response.data.errors
                }
            })
        }

        clearAlert()
    }

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR })
    }

    const logoutUser = () => {
        removeUserFromLocalStorage()
        dispatch({ type: LOGOUT_USER })
        window.location.reload();
    }

    const updateUser = async (user) => {
        dispatch({ type: UPDATE_USER_BEGIN })

        try {
            const { data } = await authFetch.patch('/auth/updateUser', user)
            addUserToLocalStorage({ user })
            dispatch({ type: UPDATE_USER_SUCCESS, payload: data })
        } catch (error) {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: {
                    message: error.response.data.message,
                }
            })
        }
    }

    return (
        <AppContext.Provider value={{ ...state, displayAlert, clearAlert, registerUser, loginUser,
            toggleSidebar, logoutUser, updateUser }}>
            { children }
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
};

export { AppProvider, initialState, useAppContext }