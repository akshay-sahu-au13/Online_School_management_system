const jwt = require('jsonwebtoken');
const config = require('../credentials/config');

module.exports.teacher = (req, res, next) => {
    if (req.cookies.myAuthToken) {
        jwt.verify(req.cookies.myAuthToken, config.jwt_secret_key, (err, data) => {
            if (err) {
                return res.status(401).send({ msg: "Invalid Authorization code" });
            };
            if (data) {
                console.log(data);
                req.user = data

                if (req.user.user_type == 'teacher') {
                    next();
                } else {
                    return res.status(401).send({ message: "You are not a teacher!" });
                }
            } else {
                return res.status(401).send({message: "Invalid Authorization code"});
            };
        });
    } else {
        return res.status(401).send({message:"Send Authorization code..."});
    };
};

module.exports.student = (req, res, next)=> {
    if (req.cookies.myAuthToken) {
        jwt.verify(req.cookies.myAuthToken, config.jwt_secret_key, (err, data) => {
            if (err) {
                return res.status(401).send({ msg: "Invalid Authorization code" });
            };
            if (data) {
                console.log(data);
                req.user = data

                if (req.user.user_type == 'student') {
                    next();
                } else {
                    return res.status(401).send({ message: "You are not a student!" });
                }
            } else {
                return res.status(401).send({message: "Invalid Authorization code"});
            };
        });
    } else {
        return res.status(401).send({message:"Send Authorization code..."});
    };
};