import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
 import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setAuthor(response.data.data.author);
      setPublishYear(response.data.data.publishYear);
      setTitle(response.data.data.title);
      setIsLoading(false);
      console.log(response.data)
    })
    .catch((error) => {
      setIsLoading(false);
      alert('An error has occured. Please check console');
      console.log(error);
    })
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setIsLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar('Book has been Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setIsLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {isLoading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-3 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-3 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4'>Publish Year</label>
          <input
            type='text'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-3 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
