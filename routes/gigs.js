const express = require('express');
const router = express.Router();
const database = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// 访问路径localhost:5000/gigs
// Get gig list
router.get('/', (req, res) => {
  Gig.findAll()
    .then(gigs => {
      console.log(gigs);
      res.render('gigs', {
        data: gigs.map(gig => gig.toJSON()) // * 新版本handlebars按照视频写法会有问题
      })
    })
    .catch(err => console.log(err))
});


// 访问路径localhost:5000/gigs/add
// Display add gig form
router.get('/add', (req, res) => {
  res.render('add');
})



// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  
  // Validate Fields
  let errors = [];

  if(!title) {
    errors.push({ text: 'Please add a title' })
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies' })
  }
  if(!description) {
    errors.push({ text: 'Please add a description' })
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' })
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      title,
      description,
      technologies,
      budget,
      contact_email
    })
  } else {

    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `\$ ${budget}`;
    }

    technologies = technologies.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Gig.create({
      title, 
      technologies,
      budget,
      description,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(error => console.log('ERROR:' + error))
  }
})


// 访问路径localhost:5000/gigs/search
// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { data: gigs.map(gig => gig.toJSON()) }))
    .catch(errors => console.log('ERROR:' + errors))
})


module.exports = router;