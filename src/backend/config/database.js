//db.js
const dotenv = require('dotenv').config();

const mongoose = require('mongoose')

const password = process.env.REACT_APP_API_PASSWORD;

const url = `mongodb+srv://tuparticular:${password}@cluster0.oiw0yxx.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
      await mongoose.connect(url, {
          useNewUrlParser: true,
      });

      console.log('MongoDB Connected...');
  }catch(err){
      console.error(err.message);
      //Exit process with failure
      process.exit(1);
  }
};

module.exports = connectDB;
