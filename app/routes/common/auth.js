const express = require('express');
const router = express.Router();
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../credentials/config');

async function findTeacher(email) {
    try {
        let teacher = await Teacher.findOne({email}).lean();
        if(teacher) {
            return {err:false, found:true, teacher};
        } else {
            return {err:true, found:false, error:"Invalid email"};
        };
    } catch (error) {
        return {err:true, error:e};
    };
};

async function findStudent(email) {
    try {
        let student = await Student.findOne({email}).lean();
        if(student){
            return {err:false, found:true, student};
        } else {
            return {err: true, found:false, error:"Invalid email"};
        }
    } catch (error) {
        return {err:true, error:e};
    };
};

