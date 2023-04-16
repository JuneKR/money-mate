import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { SavingEmergencyPlan } from "@/pages/EmergencyPages/emergencyDashboard";

interface SGoalDashBoardModalFormProps {
  title: string;
  savingGoal: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#1D1D41",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function yearsToYearsMonthsDays(value: string) {
  const values = Number(value) / 12;
  const totalDays = Number(values) * 365;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  const days = Math.floor(totalDays - years * 365 - months * 30);
  const result = years + " ปี " + months + " เดือน " + days + " วัน";
  if (isNaN(years) || isNaN(months) || isNaN(days)) {
    return "0 ปี 0 เดือน 0 วัน";
  }
  return result.toString();
}

const SGoalDashBoardModalForm: React.FC<SGoalDashBoardModalFormProps> = ({
  title,
  savingGoal,
}) => {
  console.log(savingGoal);
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
      console.log(`${urlServer}saving/goal/${savingGoal.Goal_ID}`);
      const response = await fetch(
        `${urlServer}saving/goal/${8}`,
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
  // style={{backgroundColor: "#1D1D41"}}

  const targetAmountDisplay = Number(savingGoal[0]?.TargetAmount);
  const monthlySavingDisplay = Number(savingGoal[0]?.MonthlySaving);
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();

  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ backgroundColor: "#1D1D41" }}
        className="rounded-b-2xl w-full h-full pb-10 shadow-2xl "
      >
        <div>
          <div className="flex justify-end">
            <EditIcon />
          </div>
          <div className="text-left text-white font-bold">
            <h1 className="px-2 text-xl pb-5">เป้าหมายการออมเงิน</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 p-5">
            <div
              style={{ backgroundColor: "#27264E" }}
              className="shadow-2xl rounded-lg p-5 "
            >
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {formattedํargetAmount}
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="shadow-2xl rounded-lg p-5"
            >
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                ระยะเวลาคงเหลือ
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {yearsToYearsMonthsDays(savingGoal[0]?.TimeRemaining)}
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="shadow-2xl rounded-lg p-5"
            >
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                จำนวนเดือน
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {savingGoal[0]?.TimePeriod} เดือน
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="shadow-2xl rounded-lg p-5"
            >
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                เงินออม/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {formattedMonthlySaving} บาท
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
              style={{ backgroundColor: "#27264E" }}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-white text-lg font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  จำนวนเงิน
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  id=""
                  placeholder={savingGoal[0]?.TargetAmount.toLocaleString() + " บาท"}
                  value={targetAmount2}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-lg font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  ระยะเวลา
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingGoal[0]?.TimeRemaining + " เดือน"}
                  value={timePeriod2}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-lg font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  จำนวนเดือน
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingGoal[0]?.TimePeriod + " เดือน"}
                  value={timeRemaining2}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-white text-lg font-bold mb-2"
                  htmlFor="first-name-input"
                >
                  เงินออมต่อเดือน
                </label>
                <input
                  className="text-sm bg-white border border-gray-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingGoal[0]?.MonthlySaving.toLocaleString() + " บาท/เดือน"}
                  value={monthlySaving2}
                  onChange={(e) => setMonthlySaving(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-5">
                <button
                  style={{ width: "209px", backgroundColor: "#6259E8" }}
                  className="text-lg px-4 py-2 font-bold text-white bg-gray-300 rounded shadow hover:bg-gray-400 shadow-2xl"
                  type="submit"
                >
                  ยืนยัน อัพเดทแผนของคุณ
                </button>
                <button
                  style={{ width: "209px", backgroundColor: "#27264E" }}
                  onClick={handleClose}
                  className="text-lg px-4 py-2 font-bold text-white bg-gray-300 rounded shadow hover:bg-gray-400 shadow-2xl"
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
            <div className="text-white font-bold text-2xl">
              ยินดีด้วย! คุณได้อัพเดทแผนการออมเงินเผื่อฉุกเฉินสำเร็จแล้ว
            </div>
            <div className="py-5 text-white font-bold text-md">
              อัพเดทแผนการออมสำเร็จ!!! กรุณารอสักครู่และกรุณาอย่าออกจากหน้านี้....
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SGoalDashBoardModalForm;