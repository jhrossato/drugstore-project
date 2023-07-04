const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, '../images')
    },
    filename: (req, file, callback) => {
      callback(null, file.filename + path.extname(file.originalname))
    }
  })
  
  const uploadImg = multer({storage: storage});


router.post('/', uploadImg.single('image'), (req, res) => {
    res.status(200);
});

module.exports = router;