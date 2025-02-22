const path = require("path");
const multer = require("multer");
const fs = require("fs");
const BackgroundMedia = require("../Model/BackgroundMedia");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../Public/BackgroundUrl"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); 
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images and videos are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

exports.upload = upload.single("file"); 

exports.uploadBackgroundMedia = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File not uploaded or unsupported format." });
  }
  
  const fileUrl = `${req.protocol}://${req.get("host")}/Public/BackgroundUrl/${req.file.filename}`;
  const fileType = req.file.mimetype.startsWith("image/") ? "image" : "video";
  const theme = req.body.theme || "white";
  try {
    const newMedia = new BackgroundMedia({ fileUrl, fileType,theme});
    await newMedia.save();

    res.status(200).json({ message: "File uploaded successfully", fileUrl });
  } catch (error) {
    res.status(500).json({ message: "Failed to save media metadata.", error: error.message });
  }
};

exports.updateBackgroundMedia = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File not uploaded or unsupported format." });
  }
  const fileUrl = `${req.protocol}://${req.get("host")}/Public/BackgroundUrl/${req.file.filename}`;
  const fileType = req.file.mimetype.startsWith("image/") ? "image" : "video";
  try {
    
    const existingMedia = await BackgroundMedia.findOne();

    if (existingMedia) {
      const oldFilePath = path.join(__dirname, "../Public/BackgroundUrl", path.basename(existingMedia.fileUrl));
      console.log("Attempting to delete:", oldFilePath); 

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath); 
        console.log("Old file deleted successfully");
      } else {
        console.log("Old file not found at path:", oldFilePath);
      }

      await BackgroundMedia.deleteOne({ _id: existingMedia._id });
    }

    const newMedia = new BackgroundMedia({ fileUrl, fileType });
    await newMedia.save();

    res.status(200).json({ message: "File updated successfully", fileUrl });
  } catch (error) {
    console.error("Error in updating background media:", error.message);
    res.status(500).json({ message: "Failed to update media metadata.", error: error.message });
  }
};



exports.getBackgroundMedia = async (req, res) => {
  try {
    const media = await BackgroundMedia.findOne().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: media });
  
  } catch (error) {
    return res.json([]);
  }
};


exports.deleteBackgroundMedia = async (req, res) => {
  try {

    const media = await BackgroundMedia.findOne().sort({ createdAt: -1 });

    if (!media) {
      return res.status(404).json({ message: "No media found to delete." });
    }

    const filePath = path.join(__dirname, "../Public/BackgroundUrl", path.basename(media.fileUrl));

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); 
      console.log("File deleted successfully from local storage:", filePath);
    } else {
      console.log("File not found in local storage:", filePath);
    }

    // Delete the document from the database
    await BackgroundMedia.deleteOne({ _id: media._id });

    res.status(200).json({ message: "Background media deleted successfully." });
  } catch (error) {
    console.error("Error deleting background media:", error.message);
    res.status(500).json({ message: "Failed to delete background media.", error: error.message });
  }
};