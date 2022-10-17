var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var Multer = require("./Schema");
var fs= require('fs')

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

const upload = multer({ storage: Storage, fileFilter:fileFilter });

router.post('/SingleFile', upload.single('file'), async (req, res) => {
    // console.log(req.file);
    const multers = new Multer({
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
    });
    await multers.save();
    res.json("Uploaded Successfully")
});

router.get('/', async (req, res) => {
    const multers = await Multer.find();
    res.json(multers);
});


router.delete('/:id', async (req, res) => {
    const data=await Multer.findById(req.params.id)
    await fs.unlink(data.path,(err=>{
        if(err){
            console.log("error")
        }
        else{
        console.log("deleted in file system")
        }
    }))
    await Multer.findByIdAndDelete(req.params.id);
    return res.json("Deleted")
})

module.exports = router;
