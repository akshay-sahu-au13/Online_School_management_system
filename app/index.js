const express = require('express');
const app = express();
const PORT = process.env.PORT || 8899;
const path = require('path');
const fs = require('fs');


app.set('view engine', 'ejs');

app.use(express.json({limit: '3mb'}));
app.use(express.urlencoded({extended: true, limit: '3mb'}));


app.listen(PORT, ()=> {
    console.log(`Server started on http://localhost:${PORT}`);
});
