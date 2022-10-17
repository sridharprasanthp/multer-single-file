var express = require('express');
var app = express();
var mongoose = require('mongoose');
var url = "mongodb://127.0.0.1:27017/Multer"
var cors = require('cors');
var bodyParser = require('body-parser');
var path = require('path');


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "Images")));
mongoose.connect(url, (err) => {
    if (err) {
        console.log("error")
    }
    else {
        console.log("Connected")
    }
})

const router = require('./Route')
app.use("/", router);

app.use("*", (req, res) => {
    res.send("<h1>404 Not Found</h1>")
})

app.listen(3001, () => {
    console.log('server is listening port 3001')
})