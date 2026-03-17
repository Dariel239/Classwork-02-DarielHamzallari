function saveStudentInfo(event){

    event.preventDefault(); // Prevent form submission

    let studentName = document.getElementById('studentName').value;
    let studentID = document.getElementById('studentId').value;
    let mathGrade = document.getElementById('mathGrade').value;
    let englishGrade = document.getElementById('englishGrade').value;
    let scienceGrade = document.getElementById('scienceGrade').value;

    console.log('Student Name:', studentName);

    let newStudent = {
        name: studentName,
        id: studentID,
        grades: {
            math: mathGrade,
            english: englishGrade,
            science: scienceGrade
        }
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));


    console.log('New Student Object:', newStudent);

    alert('Student information saved successfully!');

}