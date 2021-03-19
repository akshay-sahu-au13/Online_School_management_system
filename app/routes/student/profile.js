const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Student = require('../../models/student');

const img_upload = multer({
    storage: multer.diskStorage({
        destination: function (req, res, cb) {
            cb(null, './uploads');
        },
        filename: function (req, res, cb) {
            cb(null, 'img - ' + Date.now() + path.extname(file.originalname));
        }
    })
});


router.get('/', async (req, res) => {
    try {
        console.log("Student profile home: ", req.user);
        // const user = await Student.findById(req.user._id).lean();       // for cookies
        const user = await Student.findById(req.session.user._id).lean();  // for session

        res.status(200).send({ Student: user });
    } catch (error) {
        return res.status(404).send({ error: error.message });

    };
});


router.post('/update', async (req, res) => {
    try {
        if (req.body.name || req.body.email) {
            let data = {};
            if (req.body.name) data.name = req.body.name;
            if (req.body.email) data.email = req.body.email;
            await Student.findByIdAndUpdate(req.user._id, { ...data });
            res.status(201).send({ msg: "Profile Updated Successfully" });
        } else {
            res.status(400).send({ msg: "Send atleast one field" });
        };
    } catch (error) {
        return res.status(400).send({ error: error.message });
    };
});

router.post('/update_photo', img_upload.single('new_photo'), async (req, res) => {
    try {
        console.log(req.file);
        if (req.file) {
            await Student.findByIdAndUpdate(req.user._id, { profile_photo: req.file.path });
            res.status(200).send({ msg: "Profile photo update successfully" });
        } else {
            res.status(400).send({ code: 400 });
        };
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

router.post('/update_whole', img_upload.single('new_photo'), async (req, res) => {
    try {
        if (req.body.email || req.body.name || req.file) {
            data = {};
            if (req.body.name) data.name = req.body.name;
            if (req.body.email) data.email = req.body.email;
            if (req.file && req.file.path) data.profile_photo = req.file.path;
            await Student.findByIdAndUpdate(req.user._id, {...data});
        } else {
            res.status(400).send({msg: "send atleast one field"});
        }
    } catch (error) {
        return res.status(400).send({ error: error.message });
    }
});

module.exports = router;