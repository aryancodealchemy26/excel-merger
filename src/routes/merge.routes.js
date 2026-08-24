const express = require("express");

const upload = require("../middleware/upload.middleware");
const {
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
    "/upload",
    upload.array("files", 10),
    (req, res, next) => {
        req.mergeMode = "append";
        next();
    },
    mergeFiles
);

module.exports = router;