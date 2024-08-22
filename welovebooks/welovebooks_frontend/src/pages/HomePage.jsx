import { useOutletContext } from "react-router-dom";
import React from "react";
import BookCard from "../components/BookCard";

const HomePage = () => {
    const {user} = useOutletContext()
    console.log("This is", user)
    return(
        <>
        <h1>Home Page {user && user }</h1>
            <div className ="container">
            <ui>
            <BookCard bookData={{id:"1", title:"bookname1", authors: ["bob bob"], industryIdentifiesrs: "123456789"}}/>    
            <BookCard bookData={{id:"2", title:"bookname2", authors: ["cob cob"], industryIdentifiesrs: "983456789"}}/>
            </ui>
            </div>
        </>
        
        )    
}
 


export default HomePage