// const express = require('express');
// const router = express.Router();

module.exports.teacher = function(req, res, next) {
    if (req.session.user && req.user.isLoggedin == true) {
        if (req.session.user.user_type == "teacher"){
            next();
        } else {
            res.status(400).send({msg: "Invalid authorisation code"});
        };
    } else {
        res.status(400).send({msg:"Send authorisation code"});
    };
};

module.exports.student = function(req, res, next) {
    if (req.session.user && req.user.isLoggedin == true) {
        if (req.session.user.user_type == "student"){
            next();
        } else {
            res.status(400).send({msg: "Invalid authorisation code"});
        };
    } else {
        res.status(400).send({msg:"Send authorisation code"});
    };
};


// module.exports = router;
