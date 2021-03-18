const express = require('express');
const router = express.Router();
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../credentials/config');

async function findTeacher(email) {
    try {
        let teacher = await Teacher.findOne({ email }).lean();
        if (teacher) {
            return { err: false, found: true, teacher };
        } else {
            return { err: false, found: false, error: "Invalid email" };
        };
    } catch (error) {
        return { err: true, error: e };
    };
};

async function findStudent(email) {
    try {
        let student = await Student.findOne({ email }).lean();
        if (student) {
            return { err: false, found: true, student };
        } else {
            return { err: false, found: false, error: "Invalid email" };
        }
    } catch (error) {
        return { err: true, error: e };
    };
};

router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        if (req.body.email && req.body.password && req.body.method && req.body.method == 'teacher') {
            let result = await findTeacher(req.body.email);
            console.log(result)
            if (result.err || !result.found) {
                return res.status(400).send({ error: result.error })
            } else {
                const isMatch = await bcrypt.compare(req.body.password, result.teacher.password);
                if (isMatch) {
                    let token = await jwt.sign({ _id: result.teacher._id, user_type: "teacher" }, config.jwt_secret_key);
                    res.json({ result, token });
                } else {
                    return res.status(400).send({ error: "Invalid password" });
                };
            }
        } else if (req.body.email && req.body.password && req.body.method && req.body.method == 'student') {
            let result = await findStudent(req.body.email);
            if (result.err || !result.found) {
                res.status(400).send({ error: result.student.error });
            } else {
                const isMatch = await bcrypt.compareSync(req.body.password, result.student.password);
                if (isMatch) {
                    const token = await jwt.sign({ _id: result.student._id, user_type: "student" }, config.jwt_secret_key);
                    res.json({ student, token });
                } else {
                    return res.status(400).send({ error: "Invalid password" });
                };
            };
        } else {
            return res.status(400).send({ error: "Invalid or Not enough parameters!" });
        };

    } catch (error) {
        return res.status(400).send({ error:error.message})
    };
});


router.post('/login_cookie', async (req, res) => {
    try {
        console.log(req.body)
        if (req.body.email && req.body.password && req.body.method && req.body.method == 'teacher') {
            let result = await findTeacher(req.body.email);
            console.log(result)
            if (result.err || !result.found) {
                return res.status(400).send({ error: result.error })
            } else {
                const isMatch = await bcrypt.compare(req.body.password, result.teacher.password);
                if (isMatch) {
                    let token = await jwt.sign({ _id: result.teacher._id, user_type: "teacher" }, config.jwt_secret_key);
                    res
                    .cookie('myAuthToken', token, {httpOnly:true, maxAge:987654572, secure:false,sameSite:'none'})
                    .send({ result, token });
                } else {
                    return res.status(400).send({ error: "Invalid password" });
                };
            }
        } else if (req.body.email && req.body.password && req.body.method && req.body.method == 'student') {
            let result = await findStudent(req.body.email);
            if (result.err || !result.found) {
                res.status(400).send({ error: result.student.error });
            } else {
                const isMatch = await bcrypt.compareSync(req.body.password, result.student.password);
                if (isMatch) {
                    const token = await jwt.sign({ _id: result.student._id, user_type: "student" }, config.jwt_secret_key);
                    res
                    .cookie('myAuthToken', token, {httpOnly:true, maxAge: 987656787, secure:false, sameSite: 'none'})
                    .send({ result, token });
                } else {
                    return res.status(400).send({ error: "Invalid password" });
                };
            };
        } else {
            return res.status(400).send({ error: "Invalid or Not enough parameters!" });
        };

    } catch (error) {
        return res.status(400).send({ error:error.message})
    };
});


router.post('/signup', async(req, res) => {
    try {
        if (req.body.email && req.body.password && req.body.name && req.body.method && req.body.method == "teacher") {
            let teacher = await findTeacher(req.body.email);
            console.log(teacher)
            if (teacher.err) {
                return res.status(400).send({ error: teacher.err });
            } else if (teacher.found) {
                return res.status(400).send({ error: "Email already exists" });
            } else {
                let hash = bcrypt.hashSync(req.body.password, 10);
                let new_teacher = await Teacher.create({ name: req.body.name, email: req.body.email, password: hash });
                await new_teacher.save();
                let token = jwt.sign({ _id: new_teacher._id, user_type: 'teacher' }, config.jwt_secret_key);
                res.json({ teacher: new_teacher, token });
            }
        } else if (req.body.email && req.body.password && req.body.name && req.body.method && req.body.method == "student") {
            let student = await findStudent(req.body.email);
            if (student.err) {
                return res.status(400).send({ error: student.err });
            } else if (student.found) {
                return res.status(400).send({ error: "Email already exists" });
            } else {
                let hash = bcrypt.hashSync(req.body.password, 10);
                let new_student = await Student.create({ name: req.body.name, email: req.body.email, password: hash });
                await new_student.save();
                let token = jwt.sign({ _id: new_student._id, user_type: 'student' }, config.jwt_secret_key);
                res.json({ student: new_student, token });
            };

        } else {
            return res.status(400).send({ error: "Not enough parameters" });
        }
    } catch (error) {
        return res.status(400).send({ error: "Unable to Signup." });
    };
});

module.exports = router;