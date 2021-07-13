const chalk = require('chalk');
const { command, demandOption } = require('yargs');
const yargs = require('yargs');
const notes = require('./nodes.js');


// customizeing the yargs version
yargs.version('1.1.0')

// create add command

yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: "Adding node title ",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Adding node body ",
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNotes(argv.title, argv.body)
    }
})

// creating the remove command
yargs.command({
    command: 'remove',
    describe: 'Remove the note',
    builder: {
        title: {
            describe: "removing node title ",
            demandOption: true,
            type: 'string'
        }

    },
    handler (argv) {
        notes.removeNotes(argv.title)
    }
})

//creating the list command
yargs.command({
    command: 'list',
    describe: 'list of  the note',
    handler () {
        notes.listNotes()
    }
})

//creating the read command
yargs.command({
    command: 'read',
    describe: 'reading  the note',
    builder: {
        title: {
            describe: "Reading  node title ",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Reading node body ",
            demandOption: false,
            type: 'string'
        }
    },
    handler (argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse();



