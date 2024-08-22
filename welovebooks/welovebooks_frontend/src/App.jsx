import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import {Outlet, useLoaderData, useNavigate, useLocation} from 'react-router-dom' 
import axios from 'axios'   
import { api } from './utilities'

// const testConnection = async() => {
//   try{
//     let response = await api.get("books/all-books/")
    
//     console.log(response)
//   }catch (error){
//     console.error("Error",error)
//   }}

function App() {
  const [user, setUser] = useState(useLoaderData())
  const navigate = useNavigate()
  const location = useLocation()
  
  
   useEffect(()=>{
    if(user && location.pathname === '/authform/'){
     console.log(`${user.email} is loged in navigating to HOME`)
      navigate("/")
    }else if(!user && location.pathname !== '/authform/')
       navigate('/authform/')
        
},[ user, location.pathname])
  
  return (
    <>
       {location.pathname !=='/authform/' &&  <NavBar user = {user} setUser={setUser}/>}
       <Outlet context={{ user, setUser }}/>
    </>
  )
}

export default App
