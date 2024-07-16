// can have multiple index.js so long as theyre in seperate folders - note from tutor sesh
const router = require('express').Router();

// Import our modular routers for notes - copied and edited from week 11 mini project 
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;
