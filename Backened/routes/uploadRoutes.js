// Backend/routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const { upload, deleteImage } = require('../config/cloudinary');
const auth = require('../middleware/auth');

// Upload Single Image
router.post('/single', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      image: {
        url: req.file.path,
        publicId: req.file.filename
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// Upload Multiple Images
router.post('/multiple', auth, upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No images uploaded' });
    }

    const images = req.files.map(file => ({
      url: file.path,
      publicId: file.filename
    }));

    res.json({
      success: true,
      message: `${images.length} images uploaded`,
      images
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
});

// Delete Image
router.delete('/delete/:publicId', auth, async (req, res) => {
  try {
    const fullPublicId = `jagat-store/${req.params.publicId}`;
    await deleteImage(fullPublicId);
    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
});

module.exports = router;