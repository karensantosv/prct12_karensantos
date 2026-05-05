import { connect } from 'mongoose';

/**
 * Para base de datos
 */
connect('mongodb://127.0.0.1:27017/trails').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
})