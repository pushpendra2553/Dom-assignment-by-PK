// Code for Load data from Local Storage
window.addEventListener('load', () => {
    const storedData = JSON.parse(localStorage.getItem('students')) || [];
    storedData.forEach(student => addRowToTable(student));
});

//  Code For Save data to local Storage
function saveToLocalStorage() {
    const rows = document.querySelectorAll("#studentTable tbody tr");
    const students = Array.from(rows).map(row => ({
        name: row.children[0].textContent,
        id: row.children[1].textContent,
        email: row.children[2].textContent,
        contact: row.children[3].textContent
    }));
    localStorage.setItem("students", JSON.stringify(students));
}

// code for Form submit handler
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contactNo").value.trim();

// code for  fixed Data type in Input boxes 
    if (!name || !id || !email || !contact) {
        alert("Please fill in all fields.");
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Name should contain only letters.");
        return;
    }

    if (!/^\d+$/.test(id)) {
        alert("Student ID should contain only numbers.");
        return;
    }

    if (!/^\d+$/.test(contact)) {
        alert("Contact number should contain only numbers.");
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Enter a valid email address.");
        return;
    }

    const student = { name, id, email, contact };
    addRowToTable(student);
    saveToLocalStorage();
    this.reset();
});

// code for add row to table
function addRowToTable(student) {
    const table = document.querySelector("#studentTable tbody");
    const row = table.insertRow();

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button onclick="editRow(this)">Edit</button>
            <button onclick="deleteRow(this)">Delete</button>
        </td>
    `;
}

// code for Edit student record after Submit data in form
function editRow(btn) {
    const row = btn.parentElement.parentElement;
    const cells = row.querySelectorAll("td");

    const name = prompt("Enter new name:", cells[0].textContent);
    const id = prompt("Enter new student ID:", cells[1].textContent);
    const email = prompt("Enter new email:", cells[2].textContent);
    const contact = prompt("Enter new contact number:", cells[3].textContent);

    if (!name || !id || !email || !contact) {
        alert("All fields are required.");
        return;
    }

    cells[0].textContent = name;
    cells[1].textContent = id;
    cells[2].textContent = email;
    cells[3].textContent = contact;

    saveToLocalStorage();
}

//  code for Delete student record after submit form
function deleteRow(btn) {
    if (confirm("Are you sure you want to delete this record?")) {
        const row = btn.parentElement.parentElement;
        row.remove();
        saveToLocalStorage();
    }
}

// Code for change different color given by me 
document.getElementById("changeColorBtn").addEventListener("click", () => {
    const colors = ["#f8d7da", "#d4edda", "#d1ecf1", "#fff3cd", "#cce5ff", "#fefefe", "#e2e3e5"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.backgroundColor = randomColor;
});
