import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useCallback } from 'react';
interface EmergencyDashBoardModalForm4Props {
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
const EmergencyDashBoardModalForm4: React.FC<EmergencyDashBoardModalForm4Props> = (props) => {
    const [returnRate, setreturnRate] = useState('');

    const handleReturnRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setreturnRate(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = useCallback(() => {
        setOpen(true);
      }, []);
    
    return (
      <div >
        <Button onClick={handleOpen} className='w-full h-full'>
            <div className='font-bold text-black w-full h-full bg-blue-200 border border-gray-500 flex items-center justify-center'>
                <div>
                <div className='flex items-center justify-center'>
                    <h1>ผลตอบแทนที่คาดหวัง</h1>
                    </div>
                    <div className='flex items-center justify-center'>
                    <h2>1%</h2>
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
                            ผลตอบแทนที่คาดหวัง
                        </label>
                        <input
                        className="bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="first-name-input"
                        type="text"
                        value={returnRate}
                        onChange={handleReturnRateChange}
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

export default EmergencyDashBoardModalForm4;