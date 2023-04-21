import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { SavingEmergencyPlan } from "@/pages/EmergencyPages/emergencyDashboard";

interface SRetirementDashBoardModalFormProps {
  title: string;
  savingRetirement: any;
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
  const totalDays = Number(value) * 365;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  const days = Math.floor(totalDays - years * 365 - months * 30);
  const result = years + " ปี " + months + " เดือน " + days + " วัน";
  if (isNaN(years) || isNaN(months) || isNaN(days)) {
    return "0 ปี 0 เดือน 0 วัน";
  }
  return result.toString();
}

const SRetirementDashBoardModalForm: React.FC<
  SRetirementDashBoardModalFormProps
> = ({ title, savingRetirement }) => {
  console.log(savingRetirement);
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
    const updateRetirementPlanData = {
      target_amount: targetAmount2,
      time_period: timePeriod2,
      time_remaining: timeRemaining2,
      monthly_saving: monthlySaving2,
    };

    try {
      console.log("Called");
      console.log(
        `${urlServer}saving/retirement/${savingRetirement.Retirement_ID}`
      );
      const response = await fetch(
        `${urlServer}saving/retirement/${savingRetirement.Retirement_ID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateRetirementPlanData),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("done........................");
        console.log(updateRetirementPlanData);
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
  console.log("timePeriod2", timePeriod2);
  const targetAmountDisplay = Number(savingRetirement?.TargetAmount);
  const monthlySavingDisplay = Number(savingRetirement?.MonthlySaving) * -1;
  const formattedํargetAmount = targetAmountDisplay?.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay?.toLocaleString();
  //   .toLocaleString()
  return (
    <div>
      <Button
        onClick={handleOpen}
        style={{ backgroundColor: "#1D1D41" }}
        className="w-full h-full pb-10 shadow-2xl rounded-b-2xl "
      >
        <div>
          <div className="flex justify-end">
            <EditIcon />
          </div>
          <div className="font-bold text-left text-white">
            <h1 className="px-2 pb-5 text-xl">เป้าหมายการออมเงิน</h1>
          </div>
          <div className="grid grid-cols-1 gap-20 p-5 md:grid-cols-2 lg:grid-cols-4">
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl "
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {formattedํargetAmount}
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl"
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                เงินออม/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {formattedMonthlySaving} บาท
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl"
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                อายุที่ต้องการเกษียณ
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {savingRetirement?.AgeToRetire} ปี
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl"
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                ระยะเวลาคงเหลือ
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {yearsToYearsMonthsDays((savingRetirement?.TimeRemaining).toString())}
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
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-lg font-bold text-white"
                  htmlFor="first-name-input"
                >
                  จำนวนเงิน
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  type="number"
                  id=""
                  placeholder={
                    savingRetirement?.TargetAmount?.toLocaleString() + " บาท"
                  }
                  value={targetAmount2}
                  onChange={(e) => setTargetAmount(e.target.value)}
                />
              </div>
              {/* <div className="mb-4">
                <label
                  className="block mb-2 text-lg font-bold text-white"
                  htmlFor="first-name-input"
                >
                  ระยะเวลา
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingRetirement.TimeRemaining + " เดือน"}
                  value={timePeriod2}
                  onChange={(e) => setTimePeriod(e.target.value)}
                />
              </div> */}
              {/* <div className="mb-4">
                <label
                  className="block mb-2 text-lg font-bold text-white"
                  htmlFor="first-name-input"
                >
                  จำนวนเดือน
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingRetirement.TimePeriod + " เดือน"}
                  value={timeRemaining2}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                />
              </div> */}
              <div className="mb-4">
                <label
                  className="block mb-2 text-lg font-bold text-white"
                  htmlFor="first-name-input"
                >
                  เงินออมต่อเดือน
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingRetirement?.MonthlySaving + " บาท/เดือน"}
                  value={monthlySaving2}
                  onChange={(e) => setMonthlySaving(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end gap-5">
                <button
                  style={{ width: "209px", backgroundColor: "#6259E8" }}
                  className="px-4 py-2 text-lg font-bold text-white bg-gray-300 rounded shadow shadow-2xl hover:bg-gray-400"
                  type="submit"
                >
                  ยืนยัน บันทึกแผนของคุณ
                </button>
                <button
                  style={{ width: "209px", backgroundColor: "#27264E" }}
                  onClick={handleClose}
                  className="px-4 py-2 text-lg font-bold text-white bg-gray-300 rounded shadow shadow-2xl hover:bg-gray-400"
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
            <div className="text-2xl font-bold text-white">
              ยินดีด้วย! คุณได้อัพเดทแผนการออมเงินเผื่อฉุกเฉินสำเร็จแล้ว
            </div>
            <div className="py-5 font-bold text-white text-md">
              อัพเดทแผนการออมสำเร็จ!!!
              กรุณารอสักครู่และกรุณาอย่าออกจากหน้านี้....
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SRetirementDashBoardModalForm;
