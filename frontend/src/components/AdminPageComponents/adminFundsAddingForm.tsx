import React from "react";
import { useRouter } from "next/router";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface AdminFundsAddingFormProps {
  title: string;
}

const AdminFundsAddingForm: React.FC<AdminFundsAddingFormProps> = ({
  title,
}) => {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl>
          <div>
            <TextField
              required
              id="outlined-required"
              label="อัปเดตล่าสุดของกองทุน"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField required id="outlined-required" label="ประเภทกองทุน" />
            <TextField required id="outlined-required" label="ชื่อกองทุน" />
            <TextField
              required
              id="outlined-required"
              label="ระดับความเสี่ยง"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField required id="outlined-required" label="ชื่อย่อกองทุน" />
            <TextField required id="outlined-required" label="รหัสกองทุน" />
            <TextField required id="outlined-required" label="นโยบายการลงทุน" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลัง 1 ปี"
            />
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลัง 3 ปี"
            />
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลัง 5 ปี"
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนย้อนหลังตั้งแต่จัดตั้งกองทุน"
            />
          </div>
          <div>
            <TextField
              required
              id="outlined-required"
              label="มูลค่าหน่วยลงทุน"
            />
          </div>
          <div className="grid grid-cols-3">
            <TextField
              required
              id="outlined-required"
              label="เงินลงทุนขั้นต่ำครั้งแรก"
            />
            <TextField
              required
              id="outlined-required"
              label="เงินลงทุนขั้นต่ำครั้งถัดไป"
            />
          </div>
          <div className="py-5">
            <div className="flex justify-end grid grid-cols-2 gap-3">
              <button className="bg-blue-300 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded delay-150">
                ยืนยัน
              </button>
              <button className="bg-gray-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded delay-150">
                ล้างข้อมูล
              </button>
            </div>
          </div>
        </FormControl>
      </Box>
    </div>
  );
};

export default AdminFundsAddingForm;
