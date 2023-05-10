import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";

interface EmerGencyDashBoardModalWithDrawProps {
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

const EmerGencyDashBoardModalWithDraw: React.FC<
  EmerGencyDashBoardModalWithDrawProps
> = ({ savingEmergency }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [withdrawal, setwithdrawal] = useState("");
  const [date, setDate] = useState(new Date());
  const [showCongratulatoryMessage, setShowCongratulatoryMessage] =
    useState(false);
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

  const urlServer = "http://localhost:8080/";
  const tType = "withdrawal";
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

  const withdrawForm = async () => {
    const addtransaction = {
      amount: withdrawal,
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
        // window.location.href = href;
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
    await withdrawForm();
  };

  return (
    <div>
      <Button
        style={{
          width: "209px",
          marginRight: "10px",
          backgroundColor: "",
        }}
        className="px-4 py-2 text-lg font-bold text-white rounded-lg shadow-xl"
        onClick={handleOpen}
      >
        ถอนเงินออม
      </Button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form action="" onSubmit={handleSubmit}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component={"span"}>
              <div className="text-2xl font-bold text-white">ถอนเงิน</div>
              <div className="py-5">
                <input
                  type="number"
                  id=""
                  value={withdrawal}
                  onChange={(e) => setwithdrawal(e.target.value)}
                  placeholder="0"
                  style={{ width: "100%", height: "50px" }}
                  className="block text-sm text-black placeholder-gray-500 bg-white border border-gray-500 shadow-sm rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                />
              </div>
            </Typography>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              component={"span"}
            >
              <div className="text-black">
                <div className="flex grid justify-end grid-rows-2">
                  <div>
                    <button
                      style={{ width: "209px", backgroundColor: "#6259E8" }}
                      className="px-4 py-2 text-lg font-bold text-white bg-gray-300 rounded shadow shadow-2xl hover:bg-gray-400"
                      type="submit"
                    >
                      ยืนยัน
                    </button>
                    <button
                      style={{ width: "209px", backgroundColor: "#27264E" }}
                      className="px-4 py-2 text-lg font-bold text-white bg-gray-300 rounded shadow shadow-2xl hover:bg-gray-400"
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
        // onClose={() => setShowCongratulatoryMessage(false)}
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
              ว้าา.. ครั้งหน้าอย่าลืมมาออมเงินกันนะ
            </div>
            <div className="py-5 font-bold text-white text-md">
              ถอนเงินสำเร็จ! กรุณารอสักครู่... <CircularProgress />
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default EmerGencyDashBoardModalWithDraw;
