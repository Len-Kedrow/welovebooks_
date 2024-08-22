import React from "react"
import { logOut } from "../utilities";
import { Link, useNavigate, } from "react-router-dom";
import { useState } from "react";

const NavBar = ({user, setUser}) => {

  const [searchQuery, setSearchQuery] = useState("");    
  const navigate = useNavigate();
  
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
        
            setUser(await logOut());
         } catch (error) {
        console.error("LogOut Error", error);
    }
};


  

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
      setSearchQuery("");
    }
  }; 
      
console.log("user is ", user)
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid position-sticky">
          <Link className="navbar-brand" to= "/">WeLoveBooks</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria as="/">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Communications
                </a>
                <ul className="dropdown-menu">
                  <Link className="dropdown-item" to ="/feedback">FeedBack</Link>
                  <Link className="dropdown-item" to = "futherfeatures">Futher Features</Link>
                  </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" role="button" onClick={handleLogOut}>Log Out</a>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input className="form-control me-2" value = {searchQuery} type="search" placeholder="Search" aria-label="Search" onChange={(e)=>setSearchQuery(e.target.value)}/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    );
  };
  export default NavBar