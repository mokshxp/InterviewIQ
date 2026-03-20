const multer = require("multer");

const path = require("path");

const storage = multer.memoryStorage();

const ALLOWED_MIMETYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit (matches frontend)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const mime = file.mimetype;

        if (ALLOWED_MIMETYPES.includes(mime) && ALLOWED_EXTENSIONS.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF and Word documents (.pdf, .doc, .docx) are allowed."), false);
        }
    },
});

module.exports = upload;
