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
                <div className='grid grid-rows-2' style={{width: "100%"}}>
                    <div className='text-left py-2 text-black font-bold'>
                        <h1 className='px-2'>เป้าหมายการออมเงิน</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 '>
                        <div className='flex items-center justify-center text-black font-bold'>
                            100,000
                            <input
                            type="string"
                            id=""
                            // value={formData.mExpense}
                            // onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormData((prevState) => ({...prevState,mExpense: e.target.value,}))}
                            placeholder="15,000"
                            style={{ width: "100%", height: "50px" }}
                            className="block text-sm placeholder-gray-500 bg-white border border-gray-500 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" 
                          />
                        </div>
                        <div className='flex items-center justify-center text-black font-bold'>
                            5 ปี
                            <input
                            type="string"
                            id=""
                            // value={formData.mExpense}
                            // onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormData((prevState) => ({...prevState,mExpense: e.target.value,}))}
                            placeholder="15,000"
                            style={{ width: "100%", height: "50px" }}
                            className="block text-sm placeholder-gray-500 bg-white border border-gray-500 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" 
                          />
                        </div>
                    </div>    
                </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className='text-black'>
                    <form action="">
                      <div className="flex justify-end grid grid-cols-1 md:grid-cols-2">
                        
                        <div>
                          <button  style={{ width: "209px", backgroundColor: '#FEF5AC'}}className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                                    ยืนยัน
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
              </Typography>
              </Box>
          </Modal>
        
      </div>
    );
};

export default EmergencyDashBoardModalForm;