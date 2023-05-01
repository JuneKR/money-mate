import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MutualFundsTable from "@/components/AdminPageComponents/adminMutualFundsTable";

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

  const urlServer = "http://localhost:8080/";
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
        // setShowCongratulatoryMessage(true);
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
          <div>
            <TextField
              required
              id="outlined-required"
              label="อัปเดตล่าสุดของกองทุน"
              value={lastUpdate}
              onChange={(e) => setLastupdate(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              required
              id="outlined-required"
              label="ประเภทกองทุน"
              value={specDesc}
              onChange={(e) => setSpecDesc(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="ชื่อกองทุน"
              value={fundName}
              onChange={(e) => setFundName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="ระดับความเสี่ยง"
              value={riskSpectrum}
              onChange={(e) => setRiskSpectrum(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              required
              id="outlined-required"
              label="ชื่อย่อกองทุน"
              value={fundAbbrName}
              onChange={(e) => setFundAbbrName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="รหัสกองทุน"
              value={specCode}
              onChange={(e) => setSpecCode(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="นโยบายการลงทุน"
              value={policyDesc}
              onChange={(e) => setPolicyDesc(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลัง 1 ปี"
              value={oneYearReturns}
              onChange={(e) => setOneYearReturns(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลัง 3 ปี"
              value={threeYearReturns}
              onChange={(e) => setThreeYearReturns(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลัง 5 ปี"
              value={fiveYearReturns}
              onChange={(e) => setFiveYearReturns(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลังตั้งแต่จัดตั้งกองทุน"
              value={ytdReturns}
              onChange={(e) => setYtdReturns(e.target.value)}
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="มูลค่าหน่วยลงทุน"
              value={nav1}
              onChange={(e) => setNav1(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3">
            <TextField
              required
              id="outlined-required"
              label="เงินลงทุนขั้นต่ำครั้งแรก"
              value={minimumInvestmentAmount}
              onChange={(e) => setMinimumInvestmentAmount(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="เงินลงทุนขั้นต่ำครั้งถัดไป"
              value={minimumAdditionalAmount}
              onChange={(e) => setMinimumAdditionalAmount(e.target.value)}
            />
          </div>
          <div className="py-5">
            <div className="flex justify-center">
              <button
                style={{ width: "209px" }}
                className="px-4 py-2 font-bold text-black delay-150 bg-blue-300 rounded hover:bg-blue-500"
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
          className="px-4 py-2 font-bold text-black delay-150 bg-gray-300 rounded hover:bg-blue-700"
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
            className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm"
          >
            {!mutualFunds.length ? (
              <div>
                <h1 className="text-center text-black">คุณยังไม่มีประวัติ</h1>
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
    </div>
  );
};

export default AdminFundsAddingForm;
