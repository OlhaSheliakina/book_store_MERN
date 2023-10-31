import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

type Props = {
  destination?: string
}

const BackButton: React.FC<Props> = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link to={destination} className='bg-sky-800 text-white px-400 py-1 rounded-lg w-fit'>
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  )
}

export default BackButton