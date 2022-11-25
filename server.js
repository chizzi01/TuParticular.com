
const express = require('express');
const cors = require('cors');

const app = express();
const connectDB = require('./src/backend/config/database.js');

// Connect Database

connectDB();

//Init Middleware

app.use(express.json({ extended: false }));
app.use(cors());


app.get('/', (req, res) => res.send('API Running'));

// Define Routes

app.use('/api/usuarios', require('./src/routes/usuarios'));
app.use('/api/signin', require('./src/routes/signin'));

const PORT = process.env.PORT || 3900;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

