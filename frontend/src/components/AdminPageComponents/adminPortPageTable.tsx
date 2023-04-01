import React from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
interface AdminPortPageTableProps {
  title: string;
}

const AdminPortPageTable: React.FC<AdminPortPageTableProps> = ({ title }) => {
  const handleSave = () => {
    // ตรงนี้จย้า
  };

  const handleCalculate = () => {
    // ตรงนี้จย้า
  };
  const handleReturn = () => {
    // ตรงนี้จย้า
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
      field: "mutualFundAssetAllocation",
      headerName: "สัดส่วนการลงทุน (%)",
      width: 200,
      renderCell: (params) => (
        <TextField
          variant="outlined"
          size="small"
          value={params.value}
          // onChange={(event) => {
          //   const newValue = event.target.value;
          //   // update the value in your data source
          // }}
        />
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
    <div  className="bg-gray-50 w-full h-full">
      
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
      <div>
        <div className="py-5 bg-gray-50">
          <div className="flex justify-end grid grid-cols-3 gap-3">
            <button
              onClick={handleReturn}
              style={{ backgroundColor: "#D9D9D9" }}
              className="text-black font-bold py-2 px-4 rounded delay-150"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={handleCalculate}
              style={{ backgroundColor: "#FEF5AC" }}
              className=" text-black font-bold py-2 px-4 rounded delay-150"
            >
              คำนวณ
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: "#B2E8FF" }}
              className="text-black font-bold py-2 px-4 rounded delay-150"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPortPageTable;
