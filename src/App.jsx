import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentGrid from "./components/StudentGrid";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [editData, setEditData] = useState(null);

  
  const addStudent = (data) => {
    console.log("Received in App:", data); 

    if (editData) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editData.id ? data : s))
      );
      setEditData(null);
    } else {
      setStudents((prev) => [...prev, data]);
    }
  };


  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  
  const editStudentRow = (student) => {
    setEditData(student);
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  return (
    <div>
      <StudentForm
        onSubmitData={addStudent}
        editData={editData}
      />
      <h2 style={{ textAlign: "center", marginTop: "30px" }}>
        Student Data Grid
      </h2>

      <StudentGrid
        students={students}
        deleteStudent={deleteStudent}
        editStudentRow={editStudentRow}
      />
      </div>
  );
}

export default App;