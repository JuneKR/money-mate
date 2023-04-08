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
    <div
      style={{ width: "100%", height: "100%", padding: "0 4rem" }}
      className="rounded"
    >
      <label htmlFor="monthlyExpense" className="block text-sm">
        <span className="block m-1 text-white font-bold text-xl pb-2">
          รายจ่ายรายเดือน
        </span>
        <input
          type="text"
          id="mExpense"
          value={expense}
          onChange={(e) => updateFields({ expense: Number(e.target.value) })}
          placeholder="15,000"
          style={{ width: "100%", height: "50px", backgroundColor: "#27264E"}}
          className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
        />
        <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
          ข้อมูลไม่ถูกต้อง
        </p>
      </label>
      <label htmlFor="months" className="block text-sm">
        <span className="block m-1 text-white font-bold text-xl pb-2">
          จำนวนเดือนที่ต้องการเก็บ
        </span>
        <input
          type="text"
          id="months"
          value={period}
          onChange={(e) => updateFields({ period: Number(e.target.value) })}
          placeholder="6"
          style={{ width: "100%", height: "50px", backgroundColor: "#27264E" }}
          className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
        />
        <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
          ข้อมูลไม่ถูกต้อง
        </p>
      </label>
      <label htmlFor="monthlyDeposit" className="block text-sm">
        <span className="block m-1 text-white font-bold text-xl pb-2">
          เงินเก็บต่อเดือน
        </span>
        <input
          type="text"
          id="mDeposit"
          placeholder="1,000"
          value={monthlySaving}
          onChange={(e) =>
            updateFields({ monthlySaving: Number(e.target.value) })
          }
          style={{ width: "100%", height: "50px", backgroundColor: "#27264E"}}
          className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
        />
        <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
          ข้อมูลไม่ถูกต้อง
        </p>
      </label>
      <label htmlFor="currentBalance" className="block text-sm">
        <span className="block m-1 text-white font-bold text-xl pb-2">
          เงินปัจจุบัน
        </span>
        <input
          type="text"
          id="cBalance"
          placeholder="0"
          value={totalBalance}
          onChange={(e) =>
            updateFields({ totalBalance: Number(e.target.value) })
          }
          style={{ width: "100%", height: "50px", backgroundColor: "#27264E"}}
          className="text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
        />
        <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
          ข้อมูลไม่ถูกต้อง
        </p>
      </label>
    </div>
    //   </div>
  );
}
