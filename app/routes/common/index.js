const express = require('express');
const { student } = require('../../middlewares/cookie');
const router = express.Router()
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');

router.get('/', (req, res)=> {
    res.send("Connected to Server. healthcheck passed!");
});

router.get('/profile', (req, res)=> {
    console.log("Student/Teacher Profile: ",req.user)
    
    if (req.user.user_type === 'student'){
        Student.findById({_id:req.user._id}, (err, data)=> {
            if (err) return res.status(400).send({error: err.message});
            if (data){
                res.status(200).send({Student_Profile:data});
            };
        });
    } else if (req.user.user_type === 'teacher'){
        Teacher.findById({_id:req.user._id}, (err, data)=> {
            if (err) return res.status(400).send({error: err.message});
            if (data){
                res.status(200).send({Teacher_Profile:data});
            };
        });
    }
    
});

module.exports = router;