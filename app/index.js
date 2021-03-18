const express = require('express');
const app = express();
const PORT = process.env.PORT || 8899;
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cookie = require('cookie-parser');
const session = require('express-session');


app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'ejs');

app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({extended: true, limit: '3mb'}));

app.use(cookie());
app.use(session({
    secret: "My_session_secret"
}));

mongoose.connect('mongodb://localhost/schoolapp', {
    useUnifiedTopology: true,
    useNewUrlParser: true
    }).then (()=> console.log('MongoDB Connected')).catch (e => console.log("DB connection error: ",e.message));

if (process.env.NODE_ENV!="production"){
    app.use(morgan());
};
// router from index.js inside routes folder
app.use(router);

app.use(function(req, res, next){
    res.status(404).send({code:404, error: "You seem to be lost"});
});


app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
});


module.exports = app;