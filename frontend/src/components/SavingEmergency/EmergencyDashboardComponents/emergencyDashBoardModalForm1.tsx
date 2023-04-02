import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { SavingEmergencyPlan } from "@/pages/EmergencyPages/emergencyDashboard";

interface EmergencyDashBoardModalForm1Props {
  title: string;
  savingEmergency: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#E5F8FF",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EmergencyDashBoardModalForm1: React.FC<
  EmergencyDashBoardModalForm1Props
> = ({ title, savingEmergency }) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [targetAmount2, setTargetAmount] = useState("");
  const [timePeriod2, setTimePeriod] = useState("");
  const [timeRemaining2, setTimeRemaining] = useState("");
  const [monthlySaving2, setMonthlySaving] = useState("");

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const [showCongratulatoryMessage, setShowCongratulatoryMessage] =
    useState(false);
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

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

  const urlServer = "http://localhost:8080/";
  const updateEmergencyPlan = async () => {
    const updateEmergencyPlanData = {
      target_amount: targetAmount2,
      time_period: timePeriod2,
      time_remaining: timeRemaining2,
      monthly_saving: monthlySaving2,
    };

    try {
      console.log("Called");
      console.log(
        `${urlServer}saving/emergency/${savingEmergency.Emergency_ID}`
      );
      const response = await fetch(
        `${urlServer}saving/emergency/${savingEmergency.Emergency_ID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateEmergencyPlanData),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("done........................");
        console.log(updateEmergencyPlanData);
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
    await updateEmergencyPlan();
  };

  return (
    <div>
      <Button onClick={handleOpen} className="w-full h-full shadow-2xl">
        <div>
          <div className="flex justify-end">
            <EditIcon />
          </div>
          <div className="text-left  text-black font-bold py-1">
            <h1 style={{ color: "#085385" }} className="px-2">
              เป้าหมายการออมเงิน
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5">
            <div>
              <div className="flex items-center justify-center text-black font-bold">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-black">
                {savingEmergency.TargetAmount}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center text-black font-bold">
                ระยะเวลา
              </div>
              <div className="flex items-center justify-center text-black">
                {savingEmergency.TimeRemaining} เดือน
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center text-black font-bold">
                จำนวนเดือน
              </div>
              <div className="flex items-center justify-center text-black">
                {savingEmergency.TimePeriod} เดือน
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center text-black font-bold">
                เงินลงทุน/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-black">
                {savingEmergency.TimePeriod}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center text-black font-bold">
                ความเสี่ยงที่รับได้
              </div>
              <div className="flex items-center justify-center text-black text-gray-500">
                คุณยังไม่ได้ทำแบบประเมินความเสี่ยง
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center text-black font-bold">
                ผลตอบแทนที่คาดหวัง
              </div>
              <div className="flex items-center justify-center text-black text-gray-500">
                ยังไม่มีผลตอบแทน
              </div>
            </div>
          </div>
        </div>
      </Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  จำนวนเงิน
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  id=""
                  placeholder={savingEmergency.TargetAmount + " บาท"}
                  value={targetAmount2}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  ระยะเวลา
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingEmergency.TimeRemaining + " เดือน"}
                  value={timePeriod2}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  จำนวนเดือน
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingEmergency.TimePeriod + " เดือน"}
                  value={timeRemaining2}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  เงินออมต่อเดือน
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingEmergency.MonthlySaving + " บาท/เดือน"}
                  value={monthlySaving2}
                  onChange={(e) => setMonthlySaving(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-5">
                <button
                  style={{ width: "209px" }}
                  className="text-sm bg-yellow-100 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  ยืนยัน อัพเดทแผนของคุณ
                </button>
                <button
                  style={{ width: "209px" }}
                  onClick={handleClose}
                  className="text-sm bg-gray-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  ยกเลิก
                </button>
              </div>
            </form>
          </Typography>
        </Box>
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
              ยินดีด้วย! คุณได้อัพเดทแผนการออมเงินเผื่อฉุกเฉินสำเร็จแล้ว
            </div>
            <div className="py-5 text-black">อัพเดทแผนการออมสำเร็จ!!!</div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default EmergencyDashBoardModalForm1;
