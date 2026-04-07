# Student Registration Management System

A complete **Student Registration Management System** built using React.
This application allows users to register student details using a **multi-step form** with validation and manage records using **AG Grid** with edit and delete functionality.

---

# Project Description

This project provides a structured way to collect and manage student information. The form is divided into multiple steps including personal details, academic details, skills, and account information.

Form validation is implemented using **react-hook-form** and **Yup** to ensure correct data entry. After submission, student data is displayed in an **AG Grid table** with features like search, sorting, filtering, pagination, edit, and delete.

This project demonstrates real-world React concepts such as multi-step forms, CRUD operations, validation, and grid integration.

---

# Features

* Multi Step Student Registration Form
* Form validation using react-hook-form
* Yup schema validation
* Dynamic skills add/remove
* AG Grid student table
* Edit student record
* Delete student record
* Search functionality
* Export to CSV
* Pagination
* File upload (Resume)
* Toast notifications
* Password show/hide
* Reset form
* Responsive UI


# Multi Step Form Sections

## Step 1 — Personal Details

* Full Name
* Email
* Phone Number
* Age
* Gender
* Date of Birth
* Address (City, State, Pincode)

## Step 2 — Academic Details

* Student ID
* College Name
* Course
* Department
* Year
* CGPA
* Skills (Dynamic Add/Remove)

## Step 3 — Additional Details

* LinkedIn Profile
* GitHub Profile
* Resume Upload
* Username
* Password
* Confirm Password

---

#  Technologies Used

* React JS
* JavaScript
* react-hook-form
* Yup
* AG Grid
* React Toastify
* React Icons
* CSS

---

#  Libraries Used

```
react-hook-form
@yup/resolvers
yup
ag-grid-react
ag-grid-community
react-toastify
react-icons
```

# 📊 AG Grid Features

* Sorting
* Filtering
* Search
* Pagination
* Export CSV
* Responsive columns
* Edit functionality
* Delete functionality


#  Edit Functionality

* Click Edit button in grid
* Form loads with selected student data
* Update fields
* Submit form
* Data updates in grid



#  Delete Functionality

* Click delete button
* Confirmation popup appears
* Record removed from grid

---

#  Validation Rules

### Personal Details

* Name must contain only letters
* Valid email required
* Phone number must be 10 digits
* Age must be greater than 18
* Address fields required

### Academic Details

* Roll Number required
* College Name required
* Course required
* Department required
* Year required
* CGPA between 0 and 10
* At least one skill required

### Account Details

* Username minimum 4 characters
* Password must contain uppercase letter
* Password must contain lowercase letter
* Password must contain number
* Confirm password must match

---

#  Project Structure
```

src
 ├── components
 │     ├── StudentForm.js
 │     ├── StudentGrid.js
 │
 ├── validationSchema.js
 ├── App.jsx
 ├── index.jsx







