function loadStudentData() {
    const studentId = parseInt(localStorage.getItem('studentToEditId'));

    if (!studentId) {
        alert('No student selected for editing');
        window.location.href = 'index.html';
        return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(s => s.id === studentId);

    console.log('Loaded student for editing:', student);

    if (!student) {
        alert('Student not found');
        window.location.href = 'index.html';
        return;
    }

    // Populate the form with student data
    $('#studentName').val(student.name);
    $('#studentId').val(student.id);
    $('#mathGrade').val(student.grades.math);
    $('#englishGrade').val(student.grades.english);
    $('#scienceGrade').val(student.grades.science);
}

function updateStudent(event) {
    event.preventDefault();

    const studentId = parseInt(localStorage.getItem('studentToEditId'));
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        alert('Student not found');
        window.location.href = 'index.html';
        return;
    }

    // Update student data
    students[studentIndex] = {
        name: $('#studentName').val(),
        id: studentId, // Keep the same ID
        grades: {
            math: $('#mathGrade').val(),
            english: $('#englishGrade').val(),
            science: $('#scienceGrade').val()
        }
    };

    localStorage.setItem('students', JSON.stringify(students));
    localStorage.removeItem('studentToEditId'); // Clean up

    alert('Student updated successfully!');
    window.location.href = 'index.html';
}

$(document).on('DOMContentLoaded', function() {
    console.log('Edit Student page loaded');
    loadStudentData();
    console.log('Student data loaded into form');

    const form = $('#editStudentForm');
    if (form) {
        form.on('submit', updateStudent);
    }
});
