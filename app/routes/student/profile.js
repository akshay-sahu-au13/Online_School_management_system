const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const img_upload = multer({
    storage: multer.diskStorage({
        destination: function(req, res, cb){
            cb(null, './uploads');
        },
        filename: function(req, res, cb){
            cb(null, 'img - '+ Date.now()+ path.extname(file.originalname));
        }
    })
});

