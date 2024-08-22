import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import HomePage from './pages/HomePage'
import { confirmUser } from './utilities'
import AuthForm from './pages/AuthForm'
import SearchPage from './pages/SearchPage'
import FeedbackPage from './pages/FeedbackPage'

const router = createBrowserRouter([

    {
        path:"/",
        element: <App/>, 
        loader: confirmUser, 
        children:[
            {
                index:true, 
                element:<HomePage/>
            },
            {
                path:"authform", 
                element: <AuthForm/>
            },
            {
                path:"search/:searchQuery",
                element: <SearchPage/>
            },
            {
                path:"feedback", 
                element: <FeedbackPage/>
            }
        ]
    }
])

export default router; 
