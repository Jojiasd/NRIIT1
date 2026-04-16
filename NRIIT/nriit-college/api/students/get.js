/**
 * GET /api/students/get
 * Fetches all registered students
 */
module.exports = async (req, res) => {
  try {
    // In-memory storage (replace with database in production)
    const students = req.query.students ? JSON.parse(req.query.students) : [];
    
    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      count: students.length,
      students: Array.isArray(students) ? students : []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
};