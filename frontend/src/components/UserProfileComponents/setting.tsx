import React, { useState } from "react";
import Image from "next/image";
import icon1 from "@/images/Profile/img_pf_jm2.jpg";
interface SettingProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

type User = {
  fullName: string;
  birthDate: string;
  gender: "male" | "female" | "other";
  riskRate: number;
  email: string;
  phoneNumber: string;
};

type UserProfileProps = {
  user: User;
  onSave: (updatedUser: User) => void;
};
const Setting: React.FC<SettingProps> = ({ user, onSave }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [gender, setGender] = useState(user.gender);
  const [riskRate, setRiskRate] = useState(user.riskRate);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUser: User = {
      fullName,
      birthDate,
      gender,
      riskRate,
      email,
      phoneNumber,
    };

    onSave(updatedUser);
  };
  return (
    <div className="w-full h-full p-10">
      <div style={{ borderRadius: '50%' }}>
        <h1 className="pb-2 text-gray-400">รูปโปรไฟล์</h1>
        <Image
            src={icon1}
            alt="Your Image"
            className="pb-3 rounded-full "
            width={100}
            height={100}
        />
      </div>
      <div className="grid grid-cols-2">
        <div>
            <p className="pb-2 text-gray-400">ชือจริง</p>
        </div>
        <div>
            <p className="pb-2 text-gray-400">วัน/เดือน/ปีเกิด</p>
        </div>
        <div>
            <p className="pb-2 text-gray-400">เพศ</p>
        </div>
        <div>
            <p className="pb-2 text-gray-400">ระดับความเสี่ยงที่รับได้</p>
        </div>
        <div>
            <p className="pb-2 text-gray-400">อีเมล</p>
        </div>
        <div>
            <p className="pb-2 text-gray-400">โทรศัพท์</p>
        </div>

      </div>
    </div>
  );
};

export default Setting;
