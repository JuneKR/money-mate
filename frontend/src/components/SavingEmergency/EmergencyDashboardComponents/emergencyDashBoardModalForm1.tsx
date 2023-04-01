import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback } from 'react';
interface EmergencyDashBoardModalForm1Props {
    title: string;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#E5F8FF',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const EmergencyDashBoardModalForm: React.FC<EmergencyDashBoardModalForm1Props> = (props) => {
    const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen = useCallback(() => {
        setOpen(true);
      }, []);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    return (
      <div >
        <Button onClick={handleOpen} className='w-full h-full'>
            
            <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full'>
                <div className='text-left  text-black font-bold'>
                    <h1 className='px-2'>เป้าหมายการออมเงิน</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full '>
                    <div className='flex items-center justify-center text-black font-bold w-full h-full'>
                        100,000
                    </div>
                    <div className='flex items-center justify-center text-black font-bold w-full h-full'>
                        5 ปี
                    </div>
                </div>    
            </div>
        </Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >   
              <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name-input">
                                เป้าหมายการออมเงิน
                              </label>
                              <input
                              className="bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="first-name-input"
                              type="text"
                              // value={months}
                              // onChange={handleMonthsChange}
                              />
                          </div>
                          <div className="mb-4">
                              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first-name-input">
                                จำนวนปี
                              </label>
                              <input
                              className="bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                              id="first-name-input"
                              type="text"
                              // value={months}
                              // onChange={handleMonthsChange}
                              />
                          </div>
                          <div className="flex items-center justify-end">
                              <button style={{ width: "209px"}} onClick={handleClose} className="bg-yellow-100 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                              ยืนยัน
                              </button>
                          </div>
                  </form>
              </Typography>
              </Box>
          </Modal>
        
      </div>
    );
};

export default EmergencyDashBoardModalForm;