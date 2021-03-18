const express = require('express');
const { student } = require('../../middlewares/cookie');
const router = express.Router()
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');

router.get('/', (req, res)=> {
    res.send("Connected to Server. healthcheck passed!");
});

router.get('/profile', (req, res)=> {
    console.log("Student Profile: ",req.user)
    Student.findById({_id:req.user._id}, (err, data)=> {
        if (err) return res.status(400).send({error: err.message});
        if (data){
            res.status(200).send({studentProfile:data});
        }
    })
    
})

module.exports = router;