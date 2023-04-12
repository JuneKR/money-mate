type GoalData = {
  expense: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
};

type GoalFormProps = GoalData & {
  updateFields: (fields: Partial<GoalData>) => void;
};

export function GoalForm({
  expense,
  period,
  monthlySaving,
  totalBalance,
  updateFields,
}: GoalFormProps) {
  return (
    //   <div className="py-20">
    <div className="grid grid-cols-2">
      <div
        style={{ width: "100%", height: "100%", padding: "0 4rem" }}
        className="rounded"
      >
        <label htmlFor="monthlyExpense" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              ค่าใช้จ่ายรายเดือนของคุณ
            </span>
            <span
              className="inline-flex items-center justify-center w-6 h-6 bg-gray-500 rounded-full text-white font-bold text-sm cursor-pointer hover:bg-purple-600 relative"
              style={{ display: "inline-flex" }}
            >
              !
              <span
                style={{ whiteSpace: "nowrap" }}
                className="absolute ml-50 p-3 text-xs text-white bg-black rounded-lg shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-80 flex items-center"
              >
                ค่าใช้จ่ายรายเดือนของคุณ <br /> หมายถึง ค่าใช้จ่ายต่อ 1 เดือน
                ได้แก่ ค่านำ้ ค่าไฟ ค่าข้าว หรือ
                ค่าอื่นๆทีี่ใช้จ่ายเป็นประจำในทุกๆเดือน
              </span>
            </span>
          </div>
          <input
            type="text"
            id="mExpense"
            value={expense}
            onChange={(e) => updateFields({ expense: Number(e.target.value) })}
            placeholder="15,000"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="monthlyDeposit" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              จำนวนเงินที่จะออมต่อเดือน
            </span>
            <span
              className="inline-flex items-center justify-center w-6 h-6 bg-gray-500 rounded-full text-white font-bold text-sm cursor-pointer hover:bg-purple-600 relative"
              style={{ display: "inline-flex" }}
            >
              !
              <span
                style={{ whiteSpace: "nowrap" }}
                className="absolute ml-50 p-3 text-xs text-white bg-black rounded-lg shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-80 flex items-center"
              >
                จำนวนเงินที่จะออมต่อเดือน <br /> หมายถึง
                จำนวนเงินที่คุณตั้งใจจะเก็บออมต่อเดือนเพื่อที่จะทำให้แผนการออมนี้สำเร็จ
              </span>
            </span>
          </div>
          <input
            type="text"
            id="mDeposit"
            placeholder="1,000"
            value={monthlySaving}
            onChange={(e) =>
              updateFields({ monthlySaving: Number(e.target.value) })
            }
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="months" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              จำนวนเดือน
            </span>
            <span
              className="inline-flex items-center justify-center w-6 h-6 bg-gray-500 rounded-full text-white font-bold text-sm cursor-pointer hover:bg-purple-600 relative"
              style={{ display: "inline-flex" }}
            >
              !
              <span
                style={{ whiteSpace: "nowrap" }}
                className="absolute mr-50 p-3 text-xs text-white bg-black rounded-lg shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-80 flex items-center"
              >
                จำนวนเดือน <br /> หมายถึง
                จำนวนเดือนของเงินสำรองฉุกเฉินที่สามารถรับได้
                ให้คิดในกรณีที่คุณต้องมีเงินสำรองไว้กี่เดือนถึงจะพอใจ
              </span>
            </span>
          </div>
          <input
            type="text"
            id="months"
            value={period}
            onChange={(e) => updateFields({ period: Number(e.target.value) })}
            placeholder="6"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="currentBalance" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              เงินออมทั้งหมดในปัจจุบัน (ถ้ามี)
            </span>
            <span
              className="inline-flex items-center justify-center w-6 h-6 bg-gray-500 rounded-full text-white font-bold text-sm cursor-pointer hover:bg-purple-600 relative"
              style={{ display: "inline-flex" }}
            >
              !
              <span
                style={{ whiteSpace: "nowrap" }}
                className="absolute mr-50 p-3 text-xs text-white bg-black rounded-lg shadow-lg opacity-0 transition-opacity duration-300 hover:opacity-80 flex items-center"
              >
                เงินออมทั้งหมดในปัจจุบัน <br /> หมายถึง
                เงินออมที่มีอยู่แล้ว แล้วตั้งใจจำนำมาเพื่อใช้ในแผนการออมนี้ หรือเงินเก็บกองอื่นๆที่ตั้งใจนำมาสนับสนุนการออมนี้
              </span>
            </span>
          </div>
          <input
            type="text"
            id="cBalance"
            placeholder="0"
            value={totalBalance}
            onChange={(e) =>
              updateFields({ totalBalance: Number(e.target.value) })
            }
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>
      </div>
      <div className="py-5 px-10">
        <div
          style={{ backgroundColor: "#27264E" }}
          className="rounded-lg h-full shadow-2xl p-5"
        >
          สาระน่ารู้สำหรับการออมเงินเผื่อฉุกเฉิน
        </div>
      </div>
    </div>
    //   </div>
  );
}
