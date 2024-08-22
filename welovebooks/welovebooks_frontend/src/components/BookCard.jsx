

// const BookCard = ({ bookData }) => { 
//   const { title, authors, industryIdentifiers, thumbnail } = bookData;

  
//   const isbnDisplay = industryIdentifiers 
//         ? industryIdentifiers.flatMap(innerArray => 
//             innerArray.map(id => {
//                 if (id.type === 'ISBN_10') {
//                     return `ISBN-10: ${id.identifier}`;
//                 } else if (id.type === 'ISBN_13') {
//                     return `ISBN-13: ${id.identifier}`;
//                 }
//                 return null;
//             })
//         ).filter(Boolean).join(', ') 
//         : 'No ISBN available';

//   return (    
//       <div className="card" style={{ width: '18rem' }}>
//           {thumbnail && <img src={thumbnail} className="card-img-top" alt="Book cover" />}
//           <div className="card-body">
//               <h5 className="card-title">{title}</h5>
//               <p className="card-text">Author: {authors.join(', ')}</p>
//               <p className="card-text">{isbnDisplay}</p>
//               <a href="#" className="btn btn-primary">Go somewhere</a>
//           </div>
//       </div>
//   );
// }

// export default BookCard;


import React, { useState } from 'react';
import { api } from '../utilities'; 

const BookCard = ({ bookData }) => { 
  const { title, authors, industryIdentifiers, thumbnail } = bookData;
  console.log("id", industryIdentifiers)
  const [isSaved, setIsSaved] = useState(false); // Track if the book is saved

  const isbn = industryIdentifiers 
    ? industryIdentifiers.flatMap(innerArray => 
        innerArray.map(id => {
            if (id.type === 'ISBN_10') {
                return id.identifier;
            } else if (id.type === 'ISBN_13') {
                return id.identifier;
            }
            return null;
        })
      ).filter(Boolean)[0] // Using the first available ISBN
    : null;

  const handleButtonClick = async () => {
    try {
      if (isSaved) {
        // Remove the book from the user's list
        await api.delete(`/books/remove-book/`, { isbn });
        setIsSaved(false);
        // Handle success (e.g., display a message)
      } else {
        // Save the book to the user's list
        await api.post(`/books/keep-books/`, {
          title,
          authors,
          industryIdentifiers,
          thumbnail,
        });
        setIsSaved(true);
        // Handle success (e.g., display a message)
      }
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('There was an error processing your request!', error);
    }
  };

  return (    
    <div className="card" style={{ width: '18rem' }}>
      {thumbnail && <img src={thumbnail} className="card-img-top" alt="Book cover" />}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Author: {authors.join(', ')}</p>
        <p className="card-text">{isbn ? `ISBN: ${isbn}` : 'No ISBN available'}</p>
        <button onClick={handleButtonClick} className="btn btn-primary">
          {isSaved ? 'Remove from List' : 'Save to List'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
