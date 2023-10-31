import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { Book } from '../types/book';

const ShowBook = () => {
  const [book, setBook] = useState<Book>();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  console.log(book);

  return (
  <div className='p-4'>
    <BackButton />
    <h1 className='test-3xl my-4'>Show Book</h1>
    {isLoading ? (
      <Spinner />
    ) : (
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book?._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Title</span>
          <span>{book?.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Autor</span>
          <span>{book?.author}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
          <span>{book?.publishYear}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Create Time</span>
          <span>{book && book.createdAt && new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Tome</span>
          <span>{book && book.updatedAt && new Date(book.updatedAt).toString()}</span>
        </div>
      </div>
    )}
  </div>
  )
};

export default ShowBook;
