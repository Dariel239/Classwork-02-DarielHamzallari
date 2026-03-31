function fetchStudentsFromLocalStorage(){
   const students = JSON.parse(localStorage.getItem('students')) || [];
   const tableBody = $('#tableBody');


   // Clear the table body
   tableBody.html('');


   if (students.length === 0) {
       tableBody.html(`
           <tr>
               <td colspan="8" class="text-center text-muted py-4">
                   No students added yet. Click "Add Student" to get started.
               </td>
           </tr>
       `);
       return;
   }


   // Display each student
   students.forEach((student) => {
       const math = parseFloat(student.grades.math);
       const english = parseFloat(student.grades.english);
       const science = parseFloat(student.grades.science);
       const average = ((math + english + science) / 3).toFixed(2);
       const status = average >= 60 ? 'Passing' : 'Failing';
       const statusClass = average >= 60 ? 'text-success' : 'text-danger';


       const row = `
           <tr>
               <td>${student.name} (${student.id})</td>
               <td>${math}</td>
               <td>${english}</td>
               <td>${science}</td>
               <td><strong>${average}</strong></td>
               <td class="${statusClass}"><strong>${status}</strong></td>
               <td>
                   <button class="btn btn-sm btn-warning me-1" onclick="editStudent(${student.id})">Edit</button>
                   <button class="btn btn-sm btn-danger" onclick="deleteStudent(${student.id})">Delete</button>
               </td>
           </tr>
       `;
       tableBody.append(row);
   });

}

function editStudent(studentId) {
    localStorage.setItem('studentToEditId', studentId);
    window.location.href = 'edit-student.html';
}

function deleteStudent(studentId) {
    localStorage.setItem('studentToDeleteId', studentId);
    window.location.href = 'delete-student.html';
}

$(document).on('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    // You can add any initialization code here if needed

    fetchStudentsFromLocalStorage(); // Optionally fetch students on page load

});