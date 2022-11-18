// //conexion a la base de datos
// const mongoose = require('mongoose');
// const user = "tuparticular";
// const password = "9JEwGN7X9NKpJYJx";
// const database = "TuparticularDB";
// const uri = `mongodb+srv://tuparticular:${password}@cluster0.oiw0yxx.mongodb.net/?retryWrites=true&w=majority`;


// module.exports = ()=> mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } 
//   .then(() => console.log('Conectado a la base de datos'))
//   .catch(err => console.log(err))
// );

//db.js

const mongoose = require('mongoose')

const password = "aodUBDnaSVsCbC9x"

const url = `mongodb+srv://tuparticular:${password}@cluster0.oiw0yxx.mongodb.net/?retryWrites=true&w=majority`;

// const connectionParams={
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true 
// }
// const connect = async() => { mongoose.connect(url,connectionParams)
//     .then( () => {
//         console.log('Connected to the database ')
//     })
//     .catch( (err) => {
//         console.error(`Error connecting to the database. n${err}`);
//     })}

//     module.exports = connect;


//     const connectDB = async () => {
//     try {
//         await mongoose.connect(db, {
//             useNewUrlParser: true,
//         });

//         console.log('MongoDB Connected...');
//     }catch(err){
//         console.error(err.message);
//         //Exit process with failure
//         process.exit(1);
//     }
// };



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
