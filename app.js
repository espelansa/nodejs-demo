const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

// Database
const database = require('./config/database')

// Test Database Connection
database.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(error => console.error('Unable to connect to the database:', error))



const app = express();

app.get('/', (req, res) => res.send('INDEX'))

// Gig routes
app.use('/gigs', require('./routes/gigs'))



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`))