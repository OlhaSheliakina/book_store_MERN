import React from 'react';
import { Book } from '../types/book';
import Card from './Card';

type Props = {
  books: Book[];
};

const BooksCards: React.FC<Props> = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {books.map((item) => (
        <Card  key ={item._id} book={item}/>
      ))}
    </div>
  );
};

export default BooksCards;
