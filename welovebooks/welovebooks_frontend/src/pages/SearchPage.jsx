import { useOutletContext, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from '../utilities'; // 
import BookCard from "../components/BookCard";
const SearchPage = () => {
    const { user } = useOutletContext();
    const { searchQuery } = useParams();
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const bookSearch = async () => {
            try {
                let response = await api.get(`books/book-search/?q=${searchQuery.toLowerCase()}`);
                setSearchResult(response.data);
                
                console.log(response);
            } catch (error) {
                setError(true);
                console.log("Error", error);
            }
        };
        
        if (searchQuery) {
            bookSearch();
        }
    }, [searchQuery]);

    return (
        <>
            <h1>Search Page {user && user.email}</h1>
            {error && <div>Error fetching results. Please try again.</div>}
            {searchResult && (
                <div className="container">
                    <h2>Search Results:</h2>
                    <div className="row">
                        {searchResult.map(book => (
                            <div key={book.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                <BookCard bookData={book} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
    
};

export default SearchPage;