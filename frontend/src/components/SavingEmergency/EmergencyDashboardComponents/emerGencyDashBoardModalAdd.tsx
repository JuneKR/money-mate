import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
interface EmerGencyDashBoardModalProps {
  title: string;
  savingEmergency: any;
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

const EmerGencyDashBoardModal: React.FC<EmerGencyDashBoardModalProps> = ({
  savingEmergency,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [deposit, setdeposit] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCongratulatoryMessage, setShowCongratulatoryMessage] =
    useState(false);
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

  const urlServer = "http://localhost:8080/";
  const tType = "deposit";
  const tTime = date.toISOString();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (shouldRefreshPage) {
      window.location.reload();
    }
  }, [shouldRefreshPage]);

  useEffect(() => {
    if (showCongratulatoryMessage) {
      const timer = setTimeout(() => {
        setShowCongratulatoryMessage(false);
        setShouldRefreshPage(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showCongratulatoryMessage]);

  const depositForm = async () => {
    const addtransaction = {
      amount: deposit,
      type: tType,
      // type: "withdrawal",
      // TransactionDate: date.toISOString(),
      transaction_date: tTime,
    };

    try {
      console.log("Called");
      const response = await fetch(
        `${urlServer}saving/emergency/${savingEmergency}/transaction`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addtransaction),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setShowCongratulatoryMessage(true);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await depositForm();
  };

  return (
    <div>
      <Button
        style={{
          width: "209px",
          marginRight: "10px",
          backgroundColor: "#6259E8",
        }}
        className="px-4 py-2 shadow-xl font-bold text-lg text-white rounded-lg "
        onClick={handleOpen}
      >
        ออมเงิน
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form action="" onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component={"span"}>
              <div className="text-white text-2xl font-bold">เพิ่มเงินออม</div>
              <div className="py-5">
                <input
                  type="number"
                  id=""
                  value={deposit}
                  onChange={(e) => setdeposit(e.target.value)}
                  placeholder="0"
                  style={{ width: "100%", height: "50px" }}
                  className="text-black block text-sm placeholder-gray-500 bg-white border border-gray-500 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                />
              </div>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component={"span"}
            >
              <div className="text-black">
                <div className="flex justify-end grid grid-rows-2">
                  <div>
                    <button
                      style={{ width: "209px", backgroundColor: "#6259E8" }}
                      className="text-lg px-4 py-2 font-bold text-white bg-gray-300 rounded shadow hover:bg-gray-400 shadow-2xl"
                      type="submit"
                    >
                      ยืนยัน
                    </button>
                    <button
                      style={{ width: "209px", backgroundColor: "#27264E" }}
                      className="text-lg px-4 py-2 font-bold text-white bg-gray-300 rounded shadow hover:bg-gray-400 shadow-2xl"
                      type="button"
                      onClick={handleClose}
                    >
                      ยกเลิก
                    </button>
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </form>
      </Modal>
      <Modal
        open={showCongratulatoryMessage}
        onClose={() => setShowCongratulatoryMessage(false)}
        aria-labelledby="modal-congratulations-title"
        aria-describedby="modal-congratulations-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-congratulations-title"
            variant="h6"
            component={"span"}
          >
            <div className="text-black">
              ยินดีด้วย! คุณมีเงินออมเพิ่มขึ้นแล้ว
            </div>
            <div className="py-5 text-black">ฝากเงินสำเร็จ!</div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default EmerGencyDashBoardModal;
