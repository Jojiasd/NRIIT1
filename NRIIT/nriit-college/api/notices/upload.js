/**
 * POST /api/notices/upload
 * Uploads a notice (PDF/Image) to blob storage
 * 
 * Body (FormData): {
 *   file: File (required) - PDF or image file
 *   title: string (required)
 *   description: string
 *   category: string
 *   postedBy: string
 * }
 */
const { uploadToBlob } = require('../../lib/blob');

module.exports = async (req, res) => {
  try {
    // Handle file upload from FormData
    const { file, title, description, category, postedBy } = req.body;

    // Validation
    if (!file || !title) {
      return res.status(400).json({
        success: false,
        message: 'File and title are required'
      });
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return res.status(400).json({
        success: false,
        message: 'Only PDF and image files are allowed'
      });
    }

    // Validate file size (5MB max)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      return res.status(400).json({
        success: false,
        message: 'File size must not exceed 5MB'
      });
    }

    // Upload to blob storage
    const fileUrl = await uploadToBlob(file, 'notices');

    // Create notice object
    const notice = {
      id: `notice_${Date.now()}`,
      title: title.trim(),
      description: description ? description.trim() : null,
      category: category || 'General',
      fileUrl: fileUrl,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      postedBy: postedBy || 'Admin',
      uploadedAt: new Date().toISOString(),
      views: 0
    };

    // In production, save notice metadata to database:
    // await db.notices.create(notice);

    res.status(200).json({
      success: true,
      message: 'Notice uploaded successfully',
      notice: notice
    });
  } catch (error) {
    console.error('Error uploading notice:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading notice',
      error: error.message
    });
  }
};