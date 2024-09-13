const express = require('express');
const router = express.Router();

router.get("/", (reg, res)=>{
    res.send('Наш чат');
});

module.exports = router; 