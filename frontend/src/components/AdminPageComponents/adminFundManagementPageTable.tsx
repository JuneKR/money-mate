import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { urlServer } from "@/API";

interface AdminFundManagementPageTableProps {
  title: string;
}

export interface MutualFundsData {
  FundName: any;
  FundAbbrName: any;
  RiskSpectrum: any;
  LastUpdate: string | any;
  PolicyDesc: string | any;
  SpecCode: string | any;
  SpecDesc: string | any;
  NAV: string | any;
  MinimumInvestmentAmount: string | any;
  MinimumAdditionalAmount: string | any;
  oneYearReturns: string | any;
  threeYearReturns: string | any;
  fiveYearReturns: string | any;
  YTDReturns: string | any;
}

const AdminFundManagementPageTable: React.FC<
  AdminFundManagementPageTableProps
> = ({ title }) => {
  const [mutualFunds, setMutualFunds] = useState<MutualFundsData[]>([]);

  const [lastUpdate, setLastupdate] = useState("");
  const [fundName, setFundName] = useState("");
  const [fundAbbrName, setFundAbbrName] = useState("");
  const [riskSpectrum, setRiskSpectrum] = useState("");
  const [policyDesc, setPolicyDesc] = useState("");
  const [specCode, setSpecCode] = useState("");
  const [specDesc, setSpecDesc] = useState("");
  const [nav1, setNav1] = useState("");
  const [minimumInvestmentAmount, setMinimumInvestmentAmount] = useState("");
  const [minimumAdditionalAmount, setMinimumAdditionalAmount] = useState("");
  const [oneYearReturns, setOneYearReturns] = useState("");
  const [threeYearReturns, setThreeYearReturns] = useState("");
  const [fiveYearReturns, setFiveYearReturns] = useState("");
  const [ytdReturns, setYtdReturns] = useState("");
  
  const handleEdit = (id: number) => {
    // Logic to edit the record with the specified ID
  };

  const handleDelete = (id: number) => {
    // Logic to delete the record with the specified ID
  };

  console.log(mutualFunds)

  // Fetch APIs
  useEffect(() => {
    async function fetchMutualFunds() {
      try {
        //Fetch Saving Emergency Transaction
        const mutualFundsResponse = await fetch(`${urlServer}mutual/funds`, {
          credentials: "include",
        });
        const mutualFunds2 = await mutualFundsResponse.json();
        setMutualFunds(mutualFunds2);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchMutualFunds();
  }, []);
  
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

  // 
  
  const rows = mutualFunds.map((mutualFund, index) => {
    return {
      id: index + 1,
      mutualFundType: mutualFund.FundName,
      mutualFundNickName: mutualFund.FundAbbrName,
      mutualFundRisk: mutualFund.RiskSpectrum,
      mutualFundReturn1: mutualFund.oneYearReturns + "%",
      mutualFundReturn3: mutualFund.threeYearReturns + "%",
      mutualFundReturn5: mutualFund.fiveYearReturns + "%",
    };
  });
  
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={15}
        // rowsPerPageOptions={[5]}
        checkboxSelection
        className="flex justify-center item-center "
      />
    </div>
  );
};

export default AdminFundManagementPageTable;
