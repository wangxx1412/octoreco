const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    res.send('HEllo');
});

router.get('/api/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports = router;