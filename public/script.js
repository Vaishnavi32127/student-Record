document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentsList = document.getElementById('studentsList');

    // Fetch students from the server
    async function fetchStudents() {
        const res = await fetch('/api/students');
        const students = await res.json();
        renderStudents(students);
    }

    // Render students in the DOM
    function renderStudents(students) {
        studentsList.innerHTML = '';
        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.className = 'student';
            studentDiv.innerHTML = `
                <span>${student.name} (${student.age}) - ${student.email}</span>
                <button data-id="${student._id}">Delete</button>
            `;
            studentsList.appendChild(studentDiv);
        });
    }

    // Add a new student
    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newStudent = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value
        };
        const res = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newStudent)
        });
        const student = await res.json();
        fetchStudents();
        studentForm.reset();
    });

    // Delete a student
    studentsList.addEventListener('click', async (e) => {
        if (e.target.tagName === 'BUTTON') {
            const studentId = e.target.getAttribute('data-id');
            await fetch(`/api/students/${studentId}`, {
                method: 'DELETE'
            });
            fetchStudents();
        }
    });

    // Initial fetch
    fetchStudents();
});
