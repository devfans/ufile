/* dependencies */
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path')
const fs = require('fs')
const methodOverride = require('method-override');
const partials = require('express-partials');
const multer = require('multer')

// Create an Express application.
const app = express();
const url = 'https://share.livefeed.cn/'
// Add body parser.
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// const staticPath = path.join(__dirname, '../build')
// app.use(express.static(staticPath));

// const uploadsPath = path.join(__dirname, '../data/statics')
// app.use("/uploads", express.static(uploadsPath));

const storage = path => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.replace(/\s/g, ''))
  }
})

const upload = multer({ storage: storage("/home/ubuntu/share")})
const pload = multer({ storage: storage("/home/ubuntu/backup")})
const handleUpload = async (req, res) => {
    console.log(req.file)
    return res.send(url + req.file.filename)
}

app.post('/p', pload.single('ufile'), (req, res) => res.send("Finished " + req.file.filename) )
app.get('/p', (req, res) => res.sendFile('/home/ubuntu/app/ufile/pload.html'))
app.post('/', upload.single('ufile'), handleUpload)
app.get('/', (req, res) => res.sendFile('/home/ubuntu/app/ufile/upload.html'))

app.listen(3028);
