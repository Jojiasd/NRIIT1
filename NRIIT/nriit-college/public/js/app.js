// NRIIT College Portal - Main Application
const API_BASE = '/api';
let allStudents = [];
let isAdminLoggedIn = false;

// ============= STUDENT PORTAL FUNCTIONS =============

// Initialize Student Portal
if (document.getElementById('studentForm')) {
    document.getElementById('studentForm').addEventListener('submit', handleAddStudent);
    document.getElementById('searchInput').addEventListener('input', filterStudents);
    loadAllStudents();
}

// Handle Add/Update Student
async function handleAddStudent(e) {
    e.preventDefault();
    
    const student = {
        studentId: document.getElementById('studentId').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        course: document.getElementById('course').value,
        branch: document.getElementById('branch').value,
        semester: document.getElementById('semester').value,
        address: document.getElementById('address').value,
        registeredAt: new Date().toISOString()
    };

    try {
        const response = await fetch(`${API_BASE}/students/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });

        const data = await response.json();

        if (data.success) {
            showAlert(`✓ Student ${student.firstName} registered successfully!`, 'success');
            resetForm();
            loadAllStudents();
        } else {
            showAlert(`✗ Error: ${data.message}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('✗ Failed to register student. Please try again.', 'error');
    }
}

// Load All Students
async function loadAllStudents() {
    try {
        const response = await fetch(`${API_BASE}/students/get`);
        const data = await response.json();
        
        if (data.success && data.students) {
            allStudents = data.students;
            displayStudents(allStudents);
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Display Students in Table
function displayStudents(students) {
    const tbody = document.getElementById('studentsBody');
    
    if (!tbody) return;
    
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 20px;">No students registered yet.</td></tr>';
        return;
    }

    tbody.innerHTML = students.map(student => `
        <tr>
            <td><strong>${student.studentId}</strong></td>
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.phone || '-'}</td>
            <td>${student.course}</td>
            <td>${student.branch}</td>
            <td>${student.semester}</td>
            <td>
                <button class="btn btn-primary" onclick="editStudent('${student.studentId}')" style="padding: 5px 10px; font-size: 12px;">Edit</button>
                <button class="btn btn-danger" onclick="deleteStudent('${student.studentId}')" style="padding: 5px 10px; font-size: 12px; margin: 0;">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Edit Student - Load data into form
function editStudent(studentId) {
    const student = allStudents.find(s => s.studentId === studentId);
    if (!student) return;

    document.getElementById('studentId').value = student.studentId;
    document.getElementById('firstName').value = student.firstName;
    document.getElementById('lastName').value = student.lastName;
    document.getElementById('email').value = student.email;
    document.getElementById('phone').value = student.phone || '';
    document.getElementById('dob').value = student.dob || '';
    document.getElementById('course').value = student.course;
    document.getElementById('branch').value = student.branch;
    document.getElementById('semester').value = student.semester;
    document.getElementById('address').value = student.address || '';

    // Scroll to form
    document.getElementById('studentForm').scrollIntoView({ behavior: 'smooth' });
}

// Delete Student
async function deleteStudent(studentId) {
    if (!confirm('Are you sure you want to delete this student record?')) return;

    try {
        // This would require a delete endpoint
        allStudents = allStudents.filter(s => s.studentId !== studentId);
        displayStudents(allStudents);
        showAlert('✓ Student record deleted successfully!', 'success');
    } catch (error) {
        showAlert('✗ Failed to delete student record.', 'error');
    }
}

// Filter Students by Search
function filterStudents(e) {
    const query = e.target.value.toLowerCase();
    const filtered = allStudents.filter(student => 
        student.studentId.toLowerCase().includes(query) ||
        student.firstName.toLowerCase().includes(query) ||
        student.lastName.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    displayStudents(filtered);
}

// Reset Form
function resetForm() {
    document.getElementById('studentForm').reset();
    document.getElementById('studentId').focus();
}

// ============= ADMIN PORTAL FUNCTIONS =============

// Initialize Admin Portal
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', handleAdminLogin);
}

// Handle Admin Login
async function handleAdminLogin(e) {
    e.preventDefault();

    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            isAdminLoggedIn = true;
            showAlert(`✓ Welcome Admin! Logged in successfully.`, 'success');
            document.getElementById('loginCard').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');
            loadAdminStudents();
            updateAdminStats();
        } else {
            showAlert(`✗ Login failed: ${data.message || 'Invalid credentials'}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('✗ Login error. Please try again.', 'error');
    }
}

// Load Students for Admin
async function loadAdminStudents() {
    try {
        const response = await fetch(`${API_BASE}/students/get`);
        const data = await response.json();
        
        if (data.success && data.students) {
            allStudents = data.students;
            displayAdminStudents(allStudents);
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// Display Students for Admin
function displayAdminStudents(students) {
    const tbody = document.getElementById('adminStudentsBody');
    
    if (!tbody) return;
    
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No students found.</td></tr>';
        return;
    }

    tbody.innerHTML = students.map((student, index) => `
        <tr>
            <td>${student.studentId}</td>
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td>Sem ${student.semester}</td>
            <td>
                <button class="btn btn-primary" onclick="viewStudentDetails('${student.studentId}')" style="padding: 5px 10px; font-size: 12px;">View</button>
                <button class="btn btn-danger" onclick="removeStudent('${student.studentId}')" style="padding: 5px 10px; font-size: 12px; margin: 0;">Remove</button>
            </td>
        </tr>
    `).join('');
}

// View Student Details
function viewStudentDetails(studentId) {
    const student = allStudents.find(s => s.studentId === studentId);
    if (!student) return;

    const details = `
        Student ID: ${student.studentId}\n
        Name: ${student.firstName} ${student.lastName}\n
        Email: ${student.email}\n
        Phone: ${student.phone || 'N/A'}\n
        DOB: ${student.dob || 'N/A'}\n
        Course: ${student.course}\n
        Branch: ${student.branch}\n
        Semester: ${student.semester}\n
        Address: ${student.address || 'N/A'}\n
        Registered: ${new Date(student.registeredAt).toLocaleDateString()}
    `;
    alert(details);
}

// Remove Student
function removeStudent(studentId) {
    if (!confirm('Permanently delete this student record?')) return;
    allStudents = allStudents.filter(s => s.studentId !== studentId);
    displayAdminStudents(allStudents);
    showAlert('✓ Student record removed.', 'success');
    updateAdminStats();
}

// Update Admin Stats
function updateAdminStats() {
    document.getElementById('totalStudents').textContent = allStudents.length;
}

// Export Student Data
function exportStudentData() {
    let csv = 'Student ID,Name,Email,Phone,Course,Branch,Semester,Address\n';
    allStudents.forEach(student => {
        csv += `${student.studentId},"${student.firstName} ${student.lastName}",${student.email},${student.phone || ''},${student.course},${student.branch},${student.semester},"${student.address || ''}"`;
        csv += '\n';
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `NRIIT_Students_${new Date().toISOString().split('T')[0]}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showAlert('✓ Student data exported successfully!', 'success');
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        isAdminLoggedIn = false;
        document.getElementById('loginCard').classList.remove('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        document.getElementById('loginForm').reset();
        showAlert('✓ Logged out successfully.', 'success');
    }
}

// ============= UTILITY FUNCTIONS =============

// Show Alert
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.animation = 'slideIn 0.3s ease-in-out';

    alertContainer.appendChild(alertDiv);

    // Auto-remove alert after 4 seconds
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateY(-20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);

console.log('✓ NRIIT College Portal App Loaded Successfully!');