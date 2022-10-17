const singleFileUpload = async(req, res, next)=> {
    try {
        const file = req.file;
        res.status(200).send('File Uploaded')
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    singleFileUpload
}
