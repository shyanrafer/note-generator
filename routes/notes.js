// tutor helped with this page - I did delete on my own
// imports
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs') 
// fs read/writes/deletes files
const path = require('path');
// path access files - both fs and path are in library already

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  let allNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
  res.json(allNotes)
});

notes.post('/', (req, res) => {
  let allNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
  let newNote = {
    // uses user input - title and text - to make a note that is stored as JSON in db.json - id is auto applied and uniquely generated
    title: req.body.title,
    text: req.body.text,
    id: uuidv4()
  }
  // push into notes array
  allNotes.push(newNote)
  // write file with notes
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(allNotes))
  res.json(allNotes)
});

notes.delete('/:id', (req, res) => {
  // line 15 again
  let allNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));
  let noteId = req.params.id;

  // filter out the note to be deleted
  let updatedNotes = allNotes.filter(note => note.id !== noteId);

  // write the updated notes back to the file
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(updatedNotes));

  res.json(updatedNotes);
});


module.exports = notes;