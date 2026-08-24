const express = require("express");

const upload = require("../middleware/upload.middleware");

const {
    previewFiles,
    mergeFiles
} = require("../controllers/merge.controller");

const router = express.Router();

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Merge route is working"
    });
});

router.post(
    "/preview",
    upload.array("files", 10),
    previewFiles
);

router.post(
    "/",
    upload.array("files", 10),
    mergeFiles
);

module.exports = router;