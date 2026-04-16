# 🎓 NRIIT College Portal

A comprehensive web-based Student Management System built with Vercel Serverless Functions and modern web technologies. This portal provides a seamless experience for students to manage their profiles and for administrators to oversee student records.

## ✨ Features

### Student Portal
- 📝 **Student Registration & Profile Management** - Register new students and update existing profiles
- 🔍 **Search & Filter** - Easily find students by name, ID, or email
- 📋 **Student Listing** - View all registered students in a professional table format
- 🎯 **Multi-field Forms** - Comprehensive student data including:
  - Personal Information (Name, Email, Phone, DOB)
  - Academic Details (Course, Branch, Semester)
  - Address and Contact Details
- 💾 **Data Persistence** - All student records stored securely
- 📊 **Statistics Dashboard** - View enrollment statistics

### Admin Dashboard
- 🔐 **Secure Admin Login** - Protected access with authentication
- 📊 **Dashboard Analytics** - Real-time statistics and metrics
- 👥 **Student Management** - View, edit, and manage all student records
- 📥 **Export Functionality** - Download student data in CSV format
- 🔍 **Advanced Search** - Filter students by multiple criteria
- ⚙️ **Administrative Controls** - Full control over student database

### API Endpoints
- `GET /api/students/get` - Retrieve all students
- `POST /api/students/add` - Add or update student
- `POST /api/notices/upload` - Upload notices (PDF/Images)
- `GET /api/notices/list` - List all notices with pagination
- `POST /api/auth/login` - Admin authentication

### Additional Features
- 🎨 **Modern UI Design** - Beautiful gradient backgrounds and responsive layout
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile devices
- 🚀 **Fast Performance** - Optimized with Vercel edge functions
- 📦 **Blob Storage** - Integration with cloud storage for file uploads
- 🔔 **Alert System** - Real-time notifications for user actions
- ♿ **Accessible** - Semantic HTML and WCAG compliant

## 🏗️ Project Structure

```
nriit-college/
├── public/                          # Frontend files
│   ├── index.html                   # Home page
│   ├── student.html                 # Student portal
│   ├── admin.html                   # Admin dashboard
│   ├── css/
│   │   └── styles.css               # Global styles with modern design
│   ├── js/
│   │   └── app.js                   # Main application logic (1000+ lines)
│   └── images/                      # Static images
│
├── api/                             # Vercel serverless functions
│   ├── students/
│   │   ├── get.js                   # Fetch all students
│   │   └── add.js                   # Add/update student (POST)
│   ├── notices/
│   │   ├── upload.js                # Upload notice files
│   │   └── list.js                  # List notices with filters
│   └── auth/
│       └── login.js                 # Admin authentication
│
├── lib/
│   └── blob.js                      # Blob storage configuration & helpers
│
├── .env.local                       # Environment variables
├── .env.example                     # Example environment variables
├── vercel.json                      # Vercel deployment config
├── package.json                     # Dependencies & scripts
└── README.md                        # Documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Vercel CLI (optional but recommended)

### Installation

1. **Clone or download the project**
   ```bash
   cd nriit-college
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   npx vercel dev
   ```

5. **Open in browser**
   - Home: `http://localhost:3000/public/index.html`
   - Student Portal: `http://localhost:3000/public/student.html`
   - Admin Dashboard: `http://localhost:3000/public/admin.html`

## 📚 API Usage

### Get All Students
```bash
curl http://localhost:3000/api/students/get
```

**Response:**
```json
{
  \"success\": true,
  \"message\": \"Students retrieved successfully\",
  \"count\": 0,
  \"students\": []
}
```

### Add/Update Student
```bash
curl -X POST http://localhost:3000/api/students/add \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"studentId\": \"ST001\",
    \"firstName\": \"John\",
    \"lastName\": \"Doe\",
    \"email\": \"john@nriit.edu\",
    \"phone\": \"+91-9876543210\",
    \"dob\": \"2002-01-15\",
    \"course\": \"B.Tech\",
    \"branch\": \"CSE\",
    \"semester\": \"3\",
    \"address\": \"123 Main St, City\"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:3000/api/auth/login \\
  -H \"Content-Type: application/json\" \\
  -d '{
    \"email\": \"admin@nriit.edu\",
    \"password\": \"admin123\"
  }'
```

**Default Admin Credentials:**
- Email: `admin@nriit.edu`
- Password: `admin123`

⚠️ **Note:** Change these credentials in production!

### List Notices
```bash
curl \"http://localhost:3000/api/notices/list?category=Academic&limit=10&offset=0\"
```

## 🎨 UI/UX Highlights

- **Modern Design System** - Gradient backgrounds, smooth animations, and hover effects
- **Responsive Grid Layout** - Automatic column adjustment for different screen sizes
- **Interactive Forms** - Real-time validation and helpful placeholders
- **Data Tables** - Sortable and searchable student records
- **Alert System** - Animated success/error/info notifications
- **Color Scheme** - Professional blue-purple gradient with accent colors

## 🛠️ Configuration

### Environment Variables (.env.local)
```
BLOB_ACCOUNT_NAME=your-account
BLOB_CONTAINER=uploads
BLOB_ACCOUNT_KEY=your-key
```

## 📦 Deployment

### Deploy to Vercel

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m \"Initial commit\"
   git branch -M main
   git remote add origin https://github.com/yourusername/nriit-college.git
   git push -u origin main
   ```

2. **Deploy with Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

3. **Configure environment variables in Vercel dashboard**

## 🔐 Security Notes

- Replace default admin credentials before production
- Use HTTPS for all API calls
- Implement JWT token authentication
- Store passwords as hashes (bcrypt)
- Validate all inputs on server-side
- Use database instead of in-memory storage
- Implement rate limiting on API endpoints
- Add CORS policies as needed

## 📝 Database Integration

Currently uses in-memory storage. To integrate with a database:

1. **Install database client**
   ```bash
   npm install mongoose  # for MongoDB
   npm install pg        # for PostgreSQL
   npm install mysql2    # for MySQL
   ```

2. **Update API endpoints** to use database queries instead of in-memory arrays

## 🧪 Testing

```bash
npm run test
```

## 🚨 Troubleshooting

**Issue:** `npx vercel dev` not found
- **Solution:** Install Vercel CLI globally: `npm install -g vercel`

**Issue:** Port 3000 already in use
- **Solution:** Use different port: `vercel dev --listen 3001`

**Issue:** API endpoints returning empty data
- **Solution:** Check that `.env.local` is configured correctly

## 📞 Support

For issues and support, please create an issue in the GitHub repository.

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributing

Contributions are welcome! Please follow the coding standards and submit pull requests.

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Built with:** ❤️ for NRIIT College Students
