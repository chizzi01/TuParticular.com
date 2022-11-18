// const profesor = require('./src/Models/profesor');

// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();


// connectDB();


// app.use(bodyParser.urlencoded({extended: false}));

// app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });
// app.use('/api/profesores', require('./src/routes/profesores'));
// app.listen (port,  () =>{
//     console.log('Server is running on port 3900');
// });





const express = require('express');

const app = express();
const connectDB = require('./src/backend/config/database.js');

// Connect Database

connectDB();

//Init Middleware

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes

app.use('/api/profesores', require('./src/routes/profesores'));

const PORT = process.env.PORT || 3900;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

