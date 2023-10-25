import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_DB_URL } from './config.js';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoutes.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['content-Type'],
})
);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to the Book Store');
});

app.use('/books', booksRoute);

mongoose
  .connect(MONGO_DB_URL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
