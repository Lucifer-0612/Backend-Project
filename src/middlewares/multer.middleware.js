const multer = require('multer');
const path = require('path');

// Configure disk storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,"./public/temp")); // Change path as needed
    },
    filename: function (req, file, cb) {
        
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Create multer middleware
const upload = multer({ storage });

module.exports = upload;