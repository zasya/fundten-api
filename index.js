require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoose = require('mongoose');
const umkmRoutes = require('./src/routes/Umkm');

mongoose.connect(process.env.MONGO_URI)
.then(res => console.log('Connected to database'))
.catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use(cookieParser(process.env.COOKIE))
app.use(session({
    secret:process.env.SESSION,
    saveUninitialized:false,
    resave:false
}))

app.use('/umkm', umkmRoutes);

app.get("/", (req, res) => {
    res.cookie('user', 'key', {signed:true})
})

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
})