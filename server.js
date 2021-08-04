require('dotenv').config();
require('./config/databse')();
const express = require('express');
const cors = require('cors');
const apiPage = require('./routes/api');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());

app.use('/uploads', express.static('uploads'));

app.use('/mobile-world', apiPage);

app.get("/", (req, res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Click on this link: http://localhost:${PORT}`);
});