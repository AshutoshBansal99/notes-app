const fs = require('fs');
const chalk = require('chalk');
const { title } = require('process');

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}



const addNotes = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.find((note) =>
        note.title === title)

    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New notes is added!'));
    } else {
        console.log(chalk.inverse.red('Note title is taken!!!'));
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {

        console.log(chalk.green(' Notes is Removed!'));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red(' No Note title is Found !!!'));
    }

    saveNotes(notesToKeep)

}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse.yellow.bold('   Your notes   '));
    notes.forEach((note) => {
        console.log(chalk.bgWhite.blue.bold(note.title))
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse.bold.yellow(note.title));
        console.log(note.body);
    }
    else {
        console.log(chalk.red.bold(" No Note Found!!!! "));
    }

}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
};
