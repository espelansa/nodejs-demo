const express = require('express');
const router = express.Router();
const database = require('../config/database');
const Gig = require('../models/Gig');

// 访问路径localhost:5000/gigs/name
router.get('/name', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.sendStatus(200);
    })
    .catch(err => console.log(err))
});

module.exports = router;