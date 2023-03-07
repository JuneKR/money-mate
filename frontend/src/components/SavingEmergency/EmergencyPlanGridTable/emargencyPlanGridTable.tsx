import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
interface EmargencyPlanGridTableProps {
    title: string;
}

const EmargencyPlanGridTable: React.FC<EmargencyPlanGridTableProps> = (props) => {
    const columns: GridColDef[] = [
        { field: 'plan', headerName: 'เป้าหมาย', width: 70 },
        { field: 'amount', headerName: 'จำนวนเงิน', width: 130 },
        { field: 'monthlyDeposit', headerName: 'เงินออมต่อเดือน', width: 130 },
        { field: 'returnRate', headerName: 'ผลตอบแทน', width: 70 },
        { field: 'period', headerName: 'ระยะเวลา', width: 70 },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params: GridValueGetterParams) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
      ];
      const rows = [
        { id: 1, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '1%', period: '2y' },
        { id: 2, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '4.9y' },
        { id: 3, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '5y' },
        { id: 4, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '4.5y' },
        { id: 5, plan: 'A', amount: 100000, monthlyDeposit: 1500, returnRate: '4%', period: '5y' }
      ];
    
    return (
      <div  style={{ height: 400, width: '100%' }} className=" bg-gray-50 dark:bg-gray-800">
            <DataGrid
                rows={rows}
                columns={columns}
                // pageSize={5}
                // rowsPerPageOptions={[5]}
                checkboxSelection
            />
      </div>
    );
};

export default EmargencyPlanGridTable;