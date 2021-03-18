const express = require('express');
const router = express.Router()

router.get('/', (req, res)=> {
    res.send("Connected to Server. healthcheck passed!");
});

module.exports = router;