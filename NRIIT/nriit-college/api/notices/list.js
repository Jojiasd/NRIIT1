/**
 * GET /api/notices/list
 * Retrieves all notices with optional filtering
 * 
 * Query params:
 *   - category: filter by category
 *   - limit: max number of results (default: 20)
 *   - offset: pagination offset (default: 0)
 */
const { listBlobFiles } = require('../../lib/blob');

module.exports = async (req, res) => {
  try {
    const { category, limit = 20, offset = 0 } = req.query;

    // Mock notices data (in production, fetch from database)
    let notices = [
      {
        id: 'notice_1',
        title: 'Academic Calendar 2024-2025',
        description: 'Updated academic calendar for the 2024-2025 term',
        category: 'Academic',
        fileUrl: 'https://.../notices/calendar.pdf',
        fileName: 'academic-calendar.pdf',
        postedBy: 'Registrar',
        uploadedAt: new Date(Date.now() - 86400000).toISOString(),
        views: 245
      },
      {
        id: 'notice_2',
        title: 'Examination Schedule',
        description: 'Final semester examination schedule',
        category: 'Examination',
        fileUrl: 'https://.../notices/exam-schedule.pdf',
        fileName: 'exam-schedule.pdf',
        postedBy: 'Admin',
        uploadedAt: new Date(Date.now() - 172800000).toISOString(),
        views: 512
      },
      {
        id: 'notice_3',
        title: 'Scholarship Applications Open',
        description: 'Application period for merit-based scholarships',
        category: 'Scholarship',
        fileUrl: 'https://.../notices/scholarship.pdf',
        fileName: 'scholarship-info.pdf',
        postedBy: 'Finance Office',
        uploadedAt: new Date(Date.now() - 259200000).toISOString(),
        views: 843
      }
    ];

    // Filter by category if provided
    if (category) {
      notices = notices.filter(n => n.category === category);
    }

    // Apply pagination
    const total = notices.length;
    const paginatedNotices = notices.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    res.status(200).json({
      success: true,
      message: 'Notices retrieved successfully',
      count: paginatedNotices.length,
      total: total,
      offset: parseInt(offset),
      limit: parseInt(limit),
      notices: paginatedNotices,
      categories: ['Academic', 'Examination', 'Scholarship', 'Event', 'General']
    });
  } catch (error) {
    console.error('Error listing notices:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving notices',
      error: error.message
    });
  }
};