/**
 * POST /api/auth/login
 * Authenticates admin user
 * 
 * Body: {
 *   email: string (required)
 *   password: string (required)
 * }
 */
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Default admin credentials (replace with database in production)
    const ADMIN_EMAIL = 'admin@nriit.edu';
    const ADMIN_PASSWORD = 'admin123'; // In production, use hashed passwords

    // Verify credentials
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create user session object
      const adminSession = {
        email: email.toLowerCase(),
        role: 'admin',
        loginTime: new Date().toISOString(),
        permissions: ['read', 'write', 'delete']
      };

      // In production, create JWT token here:
      // const token = jwt.sign(adminSession, process.env.JWT_SECRET);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        admin: adminSession,
        // token: token  // Include in production
      });
    } else {
      // Failed login
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      success: false,
      message: 'Login error',
      error: error.message
    });
  }
};