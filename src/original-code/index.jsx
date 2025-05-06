import React, { useState } from 'react';
// import { observer } from "mobx-react";
import booksRepository from './Books/Books.repository';

export function App() {
  const [list, setList] = useState([]);

  React.useEffect(() => {
    async function load() {
      const books = await booksRepository.getBooks();
      setList(books);
    }

    load();
  }, []);

  return (
    <div>
      {list.map((book, i) => (
        <div key={i}>
          {book.author}: {book.name}
        </div>
      ))}
      <button
        onClick={() => {
          alert('TBD');
        }}
      >
        Add
      </button>
    </div>
  );
}

const ObservedApp = App;
