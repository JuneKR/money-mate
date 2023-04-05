import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface EmargencyPlanGridTableProps {
  title: string;
}

interface RowData {
  id: number;
  plan: string;
  amount: number;
  monthlyDeposit: number;
  returnRate: string;
  period: string;
}

const EmargencyPlanGridTable: React.FC<EmargencyPlanGridTableProps> = (props) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  const handleRowClick = (row: RowData) => {
    setSelectedRow(row.id);
  };

  const columns: GridColDef[] = [
    { field: 'monthlyDeposit', headerName: 'เงินออมต่อเดือน', width: 150 },
    { field: 'returnRate', headerName: 'ผลตอบแทน', width: 150 },
    { field: 'period', headerName: 'ระยะเวลา', width: 150 },
    {
      field: 'radio',
      headerName: '',
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <input
              type="radio"
              name="row-selector"
              checked={params.row.id === selectedRow}
              onChange={() => handleRowClick(params.row as RowData)}
            />
          </div>
        );
      },
    },
  ];

  function calculateTimeToAchiveGoalByReturnRate(rate: number): number {
    return 0;
  }

  const rows: RowData[] = [
    { id: 1, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '2%', period: '2y' },
    { id: 2, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '3%', period: '4.9y' },
    { id: 3, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '5y' },
    { id: 4, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '5%', period: '4.5y' },
    { id: 5, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '6%', period: '5y' },
  ];
  return (
    <div style={{ height: 400, width: '100%' }} className="bg-gray-50 dark:bg-gray-800">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default EmargencyPlanGridTable;
