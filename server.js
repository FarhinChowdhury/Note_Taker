
//DEPENDENCIES
const express = require("express");
const app = express();
const PORT = 8080
const notesInfo = './app/db.json'
const fs = require("fs")
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const path = require('path');
const uuid = require('uuid')

let noteList = fs.existsSync(notesInfo) ?
JSON.parse( fs.readFileSync(notesInfo) ) : []




// Static directory
app.use(express.static("public"));

//ROUTES-html
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"./public/index.html"))
})


//ROUTES-api
app.get("/api/notes", function(req, res){
    res.json(noteList)
})

app.post("/api/notes", function(req, res){
    //receives a new note and adds it to db.json
    const title = req.body.title
    const text = req.body.text
    const id = uuid.v4()
    const noteObject = {id, title, text}
    console.log(noteObject)
    noteList.push(noteObject)
    const file = fs.writeFileSync(notesInfo, JSON.stringify(noteList))

    console.log(noteList)
    res.send(noteObject)


})

app.delete("/api/notes/:id", function(req, res){
    const id = req.params.id
    noteList = noteList.filter(note=>note.id !== id)
    console.log(noteList)
    res.send({message: 'Note Deleted'}) 
    //destroy the note that matches the id.
    


})

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });