/**
 * POST /api/students/add
 * Adds or updates a student record
 * 
 * Body: {
 *   studentId: string (required)
 *   firstName: string (required)
 *   lastName: string (required)
 *   email: string (required)
 *   phone: string
 *   dob: date
 *   course: string (required)
 *   branch: string (required)
 *   semester: number (required)
 *   address: string
 * }
 */
module.exports = async (req, res) => {
  try {
    const { studentId, firstName, lastName, email, phone, dob, course, branch, semester, address } = req.body;

    // Validation
    if (!studentId || !firstName || !lastName || !email || !course || !branch || !semester) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: studentId, firstName, lastName, email, course, branch, semester'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    // Create student object
    const student = {
      studentId: studentId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      dob: dob || null,
      course: course.trim(),
      branch: branch.trim(),
      semester: parseInt(semester),
      address: address ? address.trim() : null,
      registeredAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In production, save to database here
    // Examples of database operations:
    // const result = await db.students.upsert(student, { where: { studentId } });

    res.status(200).json({
      success: true,
      message: `Student '${student.firstName} ${student.lastName}' registered/updated successfully`,
      student: student
    });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering student',
      error: error.message
    });
  }
};