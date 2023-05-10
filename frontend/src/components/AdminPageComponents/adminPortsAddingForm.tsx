import React from "react";
import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
interface AdminPortsAddingFormProps {
  title: string;
}

const AdminPortsAddingForm: React.FC<AdminPortsAddingFormProps> = ({
  title,
}) => {
  const router = useRouter();

  const handleNext = () => {
    router.push("/AdminPages/adminPortPage");
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
      >
        <FormControl>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              required
              id="outlined-required"
              label="ชื่อพอร์ตการลงทุน"
            />
            <TextField
              required
              id="outlined-required"
              label="เงินในพอร์ตการลงทุน"
            />
            <TextField
              required
              id="outlined-required"
              label="ระดับความเสี่ยง"
            />
          </div>
          <div className="grid grid-cols-3">
            <TextField required id="outlined-required" label="อัปเดตล่าสุด" />
            <TextField required id="outlined-required" label="วันที่เริ่มต้น" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TextField
              required
              id="outlined-required"
              label="มูลค่าพอร์ตการลงทุนที่ลงในสินทรัพย์"
            />
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนของพอร์ตการลงทุน"
            />
            <TextField
              required
              id="outlined-required"
              label="ผลตอบแทนจากการลงทุน"
            />
          </div>

          <div className="py-5">
            <div className="flex grid justify-end grid-cols-2 gap-3">
              <div></div>
              <button
                onClick={handleNext}
                className="px-4 py-2 font-bold text-black delay-150 bg-blue-300 rounded hover:bg-blue-500"
              >
                ถัดไป
              </button>
            </div>
          </div>
        </FormControl>
      </Box>
    </div>
  );
};

export default AdminPortsAddingForm;
