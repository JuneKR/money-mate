import React, { useState, useEffect } from "react";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import MutualFundsTable from "@/components/AdminPageComponents/adminMutualFundsTable";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { urlServer } from "@/API";

interface AdminFundsAddingFormProps {
  title: string;
}

export interface MutualFundsData {
  last_update: string | any;
  fund_name: string | any;
  fund_abbr_name: string | any;
  risk_spectrum: string | any;
  policy_desc: string | any;
  spec_code: string | any;
  spec_desc: string | any;
  nav: string | any;
  minimum_investment_amount: string | any;
  minimum_additional_amount: string | any;
  one_year_returns: string | any;
  three_year_returns: string | any;
  five_year_returns: string | any;
  ytd_returns: string | any;
}

const AdminFundsAddingForm: React.FC<AdminFundsAddingFormProps> = ({
  title,
}) => {
  const [mutualFunds, setMutualFunds] = useState<MutualFundsData[]>([]);

  const [lastUpdate, setLastupdate] = useState("");
  const [fundName, setFundName] = useState("");
  const [fundAbbrName, setFundAbbrName] = useState("");
  const [riskSpectrum, setRiskSpectrum] = useState("");
  const [policyDesc, setPolicyDesc] = useState("");
  const [specCode, setSpecCode] = useState("");
  const [specDesc, setSpecDesc] = useState("");
  const [nav1, setNav1] = useState("");
  const [minimumInvestmentAmount, setMinimumInvestmentAmount] = useState("");
  const [minimumAdditionalAmount, setMinimumAdditionalAmount] = useState("");
  const [oneYearReturns, setOneYearReturns] = useState("");
  const [threeYearReturns, setThreeYearReturns] = useState("");
  const [fiveYearReturns, setFiveYearReturns] = useState("");
  const [ytdReturns, setYtdReturns] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [showCongratulatoryMessage, setShowCongratulatoryMessage] =
    useState(false);
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCongratulatoryMessage]);

  
  const createMutualFund = async () => {
    const createMutualFundData = {
      last_update: lastUpdate,
      fund_name: fundName,
      fund_abbr_name: fundAbbrName,
      risk_spectrum: riskSpectrum,
      policy_desc: policyDesc,
      spec_code: specCode,
      spec_desc: specDesc,
      nav: nav1,
      minimum_investment_amount: minimumInvestmentAmount,
      minimum_additional_amount: minimumAdditionalAmount,
      one_year_returns: oneYearReturns,
      three_year_returns: threeYearReturns,
      five_year_returns: fiveYearReturns,
      ytd_returns: ytdReturns,
    };

    try {
      console.log("Called");
      console.log(`${urlServer}mutual/fund`);
      const response = await fetch(`${urlServer}mutual/fund`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createMutualFundData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("done........................");
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

  // Fetch APIs
  useEffect(() => {
    async function fetchMutualFunds() {
      try {
        //Fetch Saving Emergency Transaction
        const mutualFundsResponse = await fetch(`${urlServer}mutual/funds`, {
          credentials: "include",
        });
        const mutualFunds2 = await mutualFundsResponse.json();
        setMutualFunds(mutualFunds2);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchMutualFunds();
  }, []);

  const clearForm = () => {
    setLastupdate("");
    setSpecDesc("");
    setFundName("");
    setRiskSpectrum("");
    setFundAbbrName("");
    setSpecCode("");
    setPolicyDesc("");
    setOneYearReturns("");
    setThreeYearReturns("");
    setFiveYearReturns("");
    setYtdReturns("");
    setNav1("");
    setMinimumInvestmentAmount("");
    setMinimumAdditionalAmount("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createMutualFund();
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex justify-center item-center"
      >
        <FormControl>
          <div className="pb-5">
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  อัปเดตล่าสุดของกองทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="ปปปป-ดด-วว"
                value={lastUpdate}
                onChange={(e) => setLastupdate(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-5">
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ประเภทกองทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="ประเภทกองทุน"
                value={specDesc}
                onChange={(e) => setSpecDesc(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ชื่อกองทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="ชื่อกองทุน"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ระดับความเสี่ยง
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 - 8"
                value={riskSpectrum}
                onChange={(e) => setRiskSpectrum(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-5">
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ชื่อย่อกองทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="ชื่อย่อกองทุน"
                value={fundAbbrName}
                onChange={(e) => setFundAbbrName(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>

            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  รหัสกองทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="รหัสกองทุน"
                value={specCode}
                onChange={(e) => setSpecCode(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>

            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  นโยบายการลงทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="นโยบายการลงทุน"
                value={policyDesc}
                onChange={(e) => setPolicyDesc(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-5">
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ผลตอบแทนย้อนหลัง 1 ปี
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 %"
                value={oneYearReturns}
                onChange={(e) => setOneYearReturns(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ผลตอบแทนย้อนหลัง 3 ปี
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 %"
                value={threeYearReturns}
                onChange={(e) => setThreeYearReturns(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ผลตอบแทนย้อนหลัง 5 ปี
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 %"
                value={fiveYearReturns}
                onChange={(e) => setFiveYearReturns(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
          </div>
          <div className="pb-5">
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  ผลตอบแทนย้อนหลังตั้งแต่จัดตั้งกองทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 %"
                value={ytdReturns}
                onChange={(e) => setYtdReturns(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
          </div>
          <div className="pb-5">
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  มูลค่าหน่วยลงทุน
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 บาท"
                value={nav1}
                onChange={(e) => setNav1(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-4 pb-5">
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  เงินลงทุนขั้นต่ำครั้งแรก
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 บาท"
                value={minimumInvestmentAmount}
                onChange={(e) => setMinimumInvestmentAmount(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
            <label htmlFor="currentBalance" className="block text-sm">
              <div>
                <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
                  เงินลงทุนขั้นต่ำครั้งถัดไป
                </span>
              </div>
              <input
                type="text"
                id="cBalance"
                placeholder="0 บาท"
                value={minimumAdditionalAmount}
                onChange={(e) => setMinimumAdditionalAmount(e.target.value)}
                style={{
                  width: "100%",
                  height: "50px",
                  backgroundColor: "#27264E",
                }}
                className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
              />
            </label>
          </div>
          <div className="py-5">
            <div className="flex justify-center">
              <button
                style={{ width: "209px" }}
                className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out delay-150 transform bg-indigo-500 rounded shadow hover:scale-105 hover:bg-blue-500 focus:shadow-outline focus:outline-none"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </FormControl>
      </Box>
      <div className="flex justify-center">
        <button
          onClick={clearForm}
          style={{ width: "209px" }}
          className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out delay-150 transform bg-gray-500 rounded shadow hover:scale-105 hover:bg-blue-500 focus:shadow-outline focus:outline-none"
        >
          ล้างข้อมูล
        </button>
      </div>
      <div className="py-10 shadow-2xl">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#6259E8",
          }}
          className="py-2 rounded shadow-2xl"
        >
          <p
            style={{ padding: "0 1rem" }}
            className="text-2xl font-bold text-white "
          >
            กองทุนรวมทั้งหมด
          </p>
        </div>
        <div>
          <div
            style={{ maxHeight: "600px", overflow: "auto" }}
            className="block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-md shadow-sm"
          >
            {!mutualFunds.length ? (
              <div className="p-20">
                <p className="flex justify-center text-2xl font-bold text-white item-center">
                  ยังไม่มีกองทุน
                </p>
              </div>
            ) : (
              <div className="px-5 pb-5">
                {mutualFunds.map((mutualFund, index) => (
                  <div key={index}>
                    <MutualFundsTable
                      title={"my table1"}
                      mutualFundsData={mutualFund}
                    />
                  </div>
                ))}
              </div>
            )}
            <div></div>
          </div>
        </div>
      </div>
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
              ยินดีด้วย! คุณเพิ่มข้อมูลกองทุนสำเร็จแล้ว
            </div>
            <div className="py-5 font-bold text-white text-md">
              กรุณารอสักครู่....
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminFundsAddingForm;
