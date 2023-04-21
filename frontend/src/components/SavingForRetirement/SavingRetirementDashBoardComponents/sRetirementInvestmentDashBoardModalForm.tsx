import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useCallback } from "react";
import EditIcon from "@mui/icons-material/Edit";
import React, { useState, useEffect } from "react";

interface SRetirementInvestmentDashBoardModalFormProps {
  title: string;
  savingRetirement: any;
  savingInvestmentPort: any;
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

const SRetirementInvestmentDashBoardModalForm: React.FC<SRetirementInvestmentDashBoardModalFormProps> = 
({ title, savingRetirement, savingInvestmentPort }) => {
  const [showCongratulatoryMessage, setShowCongratulatoryMessage] = useState(false);
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);
  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => setOpen(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const [investTargetAmount, setInvestTargetAmount]: any = useState("");
  const [investTimePeriod, setInvestTimePeriod]: any = useState("");
  const [investTimeRemaining, setInvestTimeRemaining]: any = useState("");
  const [investMonthlySaving, setInvestMonthlySaving]: any = useState("");

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
  const updateRetirementPlan = async () => {
    const updateRetirementPlanData = {
      target_amount: investTargetAmount,
      time_period: investTimePeriod,
      time_remaining: investTimeRemaining,
      monthly_saving: investMonthlySaving,
    };

    try {
      console.log("APIs Called");
      console.log(
        `${urlServer}saving/retirement/${savingRetirement?.Retirement_ID}`
      );
      const response = await fetch(
        `${urlServer}saving/retirement/${savingRetirement?.Retirement_ID}`,
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
    await updateRetirementPlan();
  };

  console.log('Value', investTargetAmount)
  console.log('Value', savingRetirement?.TargetAmount)
  const targetAmountDisplay = Number(savingRetirement?.TargetAmount);
  const monthlySavingDisplay = Number(savingRetirement?.MonthlySaving) * -1;
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();
  return (
    <div>
      <Button onClick={handleOpen} style={{backgroundColor: "#1D1D41"}} className="w-full h-full pb-10 shadow-2xl rounded-b-2xl ">
        <div>
          <div className="flex justify-end">
            <EditIcon />
          </div>
          <div className="py-1 text-sm font-bold text-left text-white">
            <h1 className="px-2">
              เป้าหมายการออมเงิน
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {formattedํargetAmount} บาท
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                ระยะเวลา
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {savingRetirement?.TimeRemaining} เดือน
              </div>
            </div>
            {/* <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                จำนวนเดือน
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {savingRetirement?.TimePeriod} เดือน
              </div>
            </div> */}
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                เงินลงทุน/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {formattedMonthlySaving} บาท
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                ความเสี่ยงที่รับได้
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {savingInvestmentPort?.RiskSpectrum === undefined ? "-" : savingInvestmentPort?.RiskSpectrum}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                ผลตอบแทนที่คาดหวัง
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {savingInvestmentPort?.ReturnRate === undefined ? "-" : savingInvestmentPort?.ReturnRate}
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
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="first-name-input"
                >
                  จำนวนเงิน
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={`${savingRetirement?.TargetAmount} บาท`}
                  value={investTargetAmount}
                  onChange={(e) => setInvestTargetAmount(e.target.value)}

                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="first-name-input"
                >
                  ระยะเวลา
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingRetirement?.TimeRemaining + " เดือน"}
                  value={investTimePeriod}
                  onChange={(e) => setInvestTimePeriod(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="first-name-input"
                >
                  จำนวนเดือน
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={savingRetirement?.TimePeriod + " เดือน"}
                  value={investTimeRemaining}
                  onChange={(e) => setInvestTimeRemaining(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="first-name-input"
                >
                  เงินลงทุนต่อเดือน
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 bg-white border border-gray-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="first-name-input"
                  type="text"
                  placeholder={formattedMonthlySaving + " บาท/เดือน"}
                  value={investMonthlySaving}
                  onChange={(e) => setInvestMonthlySaving(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-end">
                <button
                  style={{ width: "209px" }}
                  className="px-4 py-2 text-sm font-bold bg-yellow-100 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  ยืนยัน
                </button>
                <button
                  style={{ width: "209px" }}
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-bold bg-yellow-100 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
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
              ยินดีด้วย! คุณได้อัพเดทแผนการลงทุนสำหรับการออมเงินเผื่อฉุกเฉินสำเร็จแล้ว
            </div>
            <div className="py-5 font-bold text-white text-md">อัพเดทแผนการลงทุนสำเร็จ!!!</div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default SRetirementInvestmentDashBoardModalForm;