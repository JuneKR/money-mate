import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
interface CompleteModalProps {
  progress: number | any;
}

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#27264E",
    border: "2px solid #000",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
  };
  
const CompleteModal: React.FC<CompleteModalProps> = ({ progress}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  function checkProgress(progress: number) {
    if (progress >= 100) {
      setShowModal(true);
    }
  }
  useEffect(() => {
    checkProgress(progress);
  }, [progress]);
  const handleCloseModal = (): void => {
    setShowModal(false);
  };
//   const p = parseFloat(progress).toFixed(2);
  return (
    <Modal
      open={showModal}
      onClose={() => handleCloseModal()}
      aria-labelledby="modal-congratulations-title"
      aria-describedby="modal-congratulations-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-congratulations-title"
          variant="h6"
          component={"span"}
        >
          <div className="text-2xl font-bold text-white">
            ยินดีด้วย! แผนการออมเงินของคุณสำเร็จแล้ว
          </div>
          <div className="py-5 font-bold text-white text-md">
            แผนการออมเงินสำเร็จ
          </div>
        </Typography>
      </Box>
    </Modal>
  );
};

export default CompleteModal;
