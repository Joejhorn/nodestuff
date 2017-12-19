const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of the Note',
  demand: true,
  alias: 'b'
}
const argv = yargs
.command('add', 'Add a New Note',{
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all Notes')
.command('read', 'Read a Note',{
   title: titleOptions,
})
.command('remove', 'Remove a note', {
  title: titleOptions
})
.help()
.argv;

var command = argv._[0];

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note created');
    notes.logNote(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  var completeNotes = notes.getAll();
  completeNotes.forEach((o) => notes.logNote(o));
} else if (command === 'read') {
  var singleNote = notes.getNote(argv.title);
  if (singleNote) {
    console.log('Note Found');
    notes.logNote(singleNote);
  } else {
    console.log('Note was not Found');
  }

} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  var message = noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
} else {
  console.log('Command not recognized');
}
