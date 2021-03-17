const express = require('express');
const router = express.Router();
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../credentials/config');




