// All modules used in this app
const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const port = 4000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));

// Using GET to link the html 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// Posts the data in a JS array
app.post("/submit", (req, res) => {
    const taskData = {
        task: req.body.newtask
    };


    // Converts the data into a JSON array
    const jsonData = JSON.stringify(taskData, null, 2);

    // Writes a new file to store all submissions
    fs.writeFile("taskData.json", jsonData, (err) => {
        if (err) {
            console.log("Error writing JSON file: ", err);
            res.sendStatus(500);
        } else {
            console.log("JSON filed created successfully");
            res.sendStatus(200);
        }
    })
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}.`);
});
