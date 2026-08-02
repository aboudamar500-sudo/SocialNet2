const router = require("express").Router();
const upload = require("../middleware/upload");

router.post("/post-image", upload.single("image"), (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            success: false,
            message: "Login required"
        });
    }

    if (!req.file) {
        return res.json({
            success: false,
            message: "No image selected"
        });
    }

    res.json({
        success: true,
        url: "/uploads/posts/" + req.file.filename
    });
});

module.exports = router;
