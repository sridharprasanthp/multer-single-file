var mongoose = require('mongoose');

const multerSchema = new mongoose.Schema({
    originalname: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Multer', multerSchema);