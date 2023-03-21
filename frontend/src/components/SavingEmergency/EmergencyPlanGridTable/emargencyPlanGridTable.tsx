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
    { field: 'plan', headerName: 'เป้าหมาย', width: 70 },
    { field: 'amount', headerName: 'จำนวนเงิน', width: 130 },
    { field: 'monthlyDeposit', headerName: 'เงินออมต่อเดือน', width: 130 },
    { field: 'returnRate', headerName: 'ผลตอบแทน', width: 70 },
    { field: 'period', headerName: 'ระยะเวลา', width: 70 },
    {
      field: 'radio',
      headerName: '',
      width: 50,
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

  const rows: RowData[] = [
    { id: 1, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '1%', period: '2y' },
    { id: 2, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '4.9y' },
    { id: 3, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '5y' },
    { id: 4, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '4.5y' },
    { id: 5, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '5y' },
  ];
  return (
    <div style={{ height: 400, width: '100%' }} className="bg-gray-50 dark:bg-gray-800">
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
};

export default EmargencyPlanGridTable;
