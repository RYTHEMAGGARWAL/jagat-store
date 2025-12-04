// Backend/config/cloudinary.js
// ✅ FIXED FOR multer-storage-cloudinary v2.2.1

const cloudinary = require('cloudinary').v2;
const multer = require('multer');

// ✅ Version 2.x syntax - NO destructuring
const CloudinaryStorage = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// ✅ Version 2.x storage syntax
const storage = CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'jagat-store',
  allowedFormats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
  transformation: [
    { width: 500, height: 500, crop: 'limit' },
    { quality: 'auto:good' },
    { fetch_format: 'auto' }
  ]
});

// Multer upload
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Delete image helper
const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};

module.exports = { cloudinary, upload, deleteImage };