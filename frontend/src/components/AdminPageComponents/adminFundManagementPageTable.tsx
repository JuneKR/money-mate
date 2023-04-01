import React from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface AdminFundManagementPageTableProps {
  title: string;
}

const AdminFundManagementPageTable: React.FC<AdminFundManagementPageTableProps> = ({ title }) => {
  const handleEdit = (id: number) => {
    // Logic to edit the record with the specified ID
  };

  const handleDelete = (id: number) => {
    // Logic to delete the record with the specified ID
  };

  const router = useRouter();
  const handleEmergencyHomepage = () => {
    router.push("/EmergencyPages/emergencyHomepage");
  };
  const columns: GridColDef[] = [
    {
      field: "mutualFundType",
      headerName: "ประเภทกองทุนรวม",
      width: 130,
      headerClassName: "font-bold",
    },
    {
      field: "mutualFundNickName",
      headerName: "ชื่อย่อกองทุน",
      width: 130,
      headerClassName: "font-bold",
    },
    {
      field: "mutualFundRisk",
      headerName: "ระดับความเสี่ยง",
      width: 130,
      headerClassName: "font-bold",
    },
    {
      field: "mutualFundReturn1",
      headerName: "1%",
      width: 50,
      headerClassName: "font-bold",
    },
    {
      field: "mutualFundReturn3",
      headerName: "3%",
      width: 50,
    },
    {
      field: "mutualFundReturn5",
      headerName: "5%",
      width: 100,
    },
    {
      field: "Edit",
      headerName: "แก้ไข",
      width: 50,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon style={{ color: "#96FFAD" }} />
          </IconButton>
        </>
      ),
    },
    {
      field: "Delete",
      headerName: "ลบ",
      width: 50,
      sortable: false,
      renderCell: (params: GridCellParams) => (
        <>
          <IconButton
            aria-label="delete"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon style={{ color: "#FF8C73" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      mutualFundType: "Snow",
      mutualFundNickName: "Jon",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 2,
      mutualFundType: "Lannister",
      mutualFundNickName: "Cersei",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 3,
      mutualFundType: "Lannister",
      mutualFundNickName: "Jaime",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 4,
      mutualFundType: "Stark",
      mutualFundNickName: "Arya",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 5,
      mutualFundType: "Targaryen",
      mutualFundNickName: "Daenerys",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 6,
      mutualFundType: "Melisandre",
      mutualFundNickName: "Melisandre",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 7,
      mutualFundType: "Clifford",
      mutualFundNickName: "Ferrara",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 8,
      mutualFundType: "Frances",
      mutualFundNickName: "Rossini",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
    {
      id: 9,
      mutualFundType: "Roxie",
      mutualFundNickName: "Harvey",
      mutualFundRisk: 1,
      mutualFundReturn1: 35,
      mutualFundReturn3: 42,
      mutualFundReturn5: 16,
    },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={15}
        // rowsPerPageOptions={[5]}
        checkboxSelection
        className="flex item-center justify-center "
      />
    </div>
  );
};

export default AdminFundManagementPageTable;
