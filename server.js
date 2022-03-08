const express = require('express');
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
const app = express();
//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming json data
app.use(express.json());
//middleware to access frontend files w/o having to write routes for each one
app.use(express.static('public'));
app.use('/api/', apiRoutes);
app.use('/', htmlRoutes);
const { animals } = require('./data/animals.json');


app.listen(PORT, (req, res) => {
    console.log(`API server now on port ${PORT}`);
});