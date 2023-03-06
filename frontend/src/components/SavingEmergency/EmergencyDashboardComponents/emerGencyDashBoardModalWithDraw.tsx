import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
interface EmerGencyDashBoardModalWithDrawProps {
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
// style={{backgroundColor: '#E5F8FF', height: '100%', width: '100%'}}
const EmerGencyDashBoardModalWithDraw: React.FC<EmerGencyDashBoardModalWithDrawProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
    return (
      <div>
        <Button style={{ width: "209px", backgroundColor: '#FF8C73'}} className="px-4 py-2 font-bold text-black rounded shadow focus:shadow-outline focus:outline-none" onClick={handleOpen}>ถอนเงินออม</Button>
          <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
          >   
              <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  <div className='text-black'>
                    ถอนเงินออม
                  </div>
                  <div className='py-5'>
                        <input
                            type="string"
                            id=""
                            // value={formData.mExpense}
                            // onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormData((prevState) => ({...prevState,mExpense: e.target.value,}))}
                            placeholder="15,000"
                            style={{ width: "100%", height: "50px" }}
                            className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" 
                          />
                        </div>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <div className='text-black'>
                    <form action="">
                      <div className="flex justify-end grid grid-rows-2">
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

export default EmerGencyDashBoardModalWithDraw;