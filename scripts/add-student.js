function generateStudentId() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const existingIds = students.map(s => s.id);

    let newId;
    do {
        newId = Math.floor(Math.random() * 15000) + 1; // Random number between 1 and 15000
    } while (existingIds.includes(newId));

    return newId;
}

function saveStudentInfo(event){

    event.preventDefault(); // Prevent form submission

    let $studentName = $('#studentName').val();
    let studentID = generateStudentId(); // Auto-generate student ID
    let $mathGrade = $('#mathGrade').val();
    let $englishGrade = $('#englishGrade').val();
    let $scienceGrade = $('#scienceGrade').val();

    console.log('Student Name:', studentName);

    let newStudent = {
        name: $studentName,
        id: studentID,
        grades: {
            math: $mathGrade,
            english: $englishGrade,
            science: $scienceGrade
        }
    }

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));


    console.log('New Student Object:', newStudent);

    alert('Student information saved successfully!');
    window.location.href = 'index.html';
}