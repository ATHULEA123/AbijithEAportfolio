const express = require("express");
const router = express.Router();
const uploadController = require("../Controller/uploadcontroler");

router.post("/upload-background", uploadController.upload, uploadController.uploadBackgroundMedia);
router.put("/upload-background", uploadController.upload, uploadController.updateBackgroundMedia);

router.get("/upload-background", uploadController.getBackgroundMedia);

router.delete("/upload-background", uploadController.deleteBackgroundMedia);

module.exports = router;

