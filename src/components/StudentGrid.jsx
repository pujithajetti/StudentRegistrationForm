import { AgGridReact } from "ag-grid-react";
import { useRef, useState, useMemo } from "react";
import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function StudentGrid({ students, deleteStudent, editStudentRow }) {
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);

  
  const onGridReady = (params) => {
    setGridApi(params.api);

    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 100);
  };


  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true,
      flex: 1,
    }),
    []
  );

  
  const columnDefs = useMemo(
    () => [
      { headerName: "Name", field: "name", minWidth: 150 },
      { headerName: "Email", field: "email", minWidth: 200 },

      {
        headerName: "Phone",
        valueGetter: (params) => params.data?.phoneNumber,
        minWidth: 140,
      },

      {
        headerName: "Course",
        valueGetter: (params) => params.data?.academic?.course,
        minWidth: 130,
      },

      {
        headerName: "Department",
        valueGetter: (params) => params.data?.academic?.department,
        minWidth: 160,
      },

      {
        headerName: "CGPA",
        valueGetter: (params) => params.data?.academic?.cgpa,
        minWidth: 100,
      },

      {
        headerName: "Skills",
        valueGetter: (params) =>
          params.data?.skills?.map((s) => s.skill).join(", "),
        minWidth: 200,
      },

      {
        headerName: "Actions",
        minWidth: 260,
        cellRenderer: (params) => {
          return (
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                height: "100%",
              }}
            >
        
              <button
                onClick={() => editStudentRow(params.data)}
                style={{
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

            
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete?")) {
                    deleteStudent(params.data.id);
                  }
                }}
                style={{
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  backgroundColor: "red",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [deleteStudent, editStudentRow]
  );

  return (
    <div style={{ width: "85%", margin: "auto", marginTop: "20px" }}>
      
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        
        
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "6px",
            width: "220px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
          onChange={(e) => {
            if (gridRef.current?.api) {
              gridRef.current.api.setQuickFilter(e.target.value);
            }
          }}
        />

        
        <button
          onClick={() => {
            if (gridApi) {
              gridApi.exportDataAsCsv();
            }
          }}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      
      <div
        className="ag-theme-alpine"
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={students}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={5}
          onGridReady={onGridReady}
          overlayNoRowsTemplate="No students found"
          rowHeight={60}
          headerHeight={60}
        />
      </div>
    </div>
  );
}

export default StudentGrid;