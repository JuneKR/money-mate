import React, { useState } from "react";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const initialFormValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

const EmergencyMyPortForm = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues); // Do something with the form data
    setFormValues(initialFormValues); // Reset the form
  };

  return (
    <form onSubmit={handleSubmit} className=' py-5 px-5'>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          ประเภทกองทุนรวม
        </label>
        <input 
          className="bg-white appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="กองทุนรวมตราสารหนี้"
          name="name"
          value={formValues.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          สินทรัพย์ที่ลงทุน
        </label>
        <input
          className="bg-white appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="TISCOSTF"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
          จำนวนเงิน
        </label>
        <textarea
          className="bg-white appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          placeholder="1000"
          name="message"
          value={formValues.message}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="flex items-center justify-end">
        <div className="flex justify-end py-2">
                <div className="py-5">
                     <button style={{ width: "209px",marginRight: "10px", backgroundColor: '#B2E8FF'}}className="px-4 py-2 font-bold text-black rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                              เพิ่ม
                     </button>
                     
                     <button style={{ width: "209px", marginLeft: "10px", backgroundColor: '#FF8C73'}}className="px-4 py-2 font-bold text-black rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" type="button">
                              ลบ
                     </button>
                  </div>
            </div>
      </div>
    </form>
  );
};

export default EmergencyMyPortForm;
