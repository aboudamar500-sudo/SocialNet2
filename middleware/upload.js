const multer = require("multer");
const path = require("path");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
    destination: "uploads/posts",

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, uuid() + ext);
    }
});

const upload = multer({
    storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Images only"));
        }
    }
});

module.exports = upload;
