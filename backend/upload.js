const multer = require("multer");
const path = require("path");

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "media/");
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, guid() + ext);
    }
});

const upload = multer({ storage: uploadStorage });

function guid() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


module.exports = upload;
