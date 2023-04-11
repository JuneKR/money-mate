import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const registerInformation = {
    first_name: firstName,
    last_name: lastName,
    date_of_birth: null,
    gender: null,
    risk_level: 0,
    email: email,
    password: password,
    conf_password: confirmPassword,
  };
  const href = "/UserManagement/login";
  const register = async () => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerInformation),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = href;
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register();
  };
  const handleLogin = () => {
    router.push("/UserManagement/login");
  };
  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="stylesheet" href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" /> */}
        {/* {styles.main} */}
      </Head>

      <main className={styles.main}>
        <div className="flex items-center justify-center w-full h-screen min-h-screen mx-auto bg-white lg:flex-row">
          <div className="items-center w-full px-4 mt-4 space-y-4 lg:w-2/3 lg:mt-0 sm:px-16 md:px-32 lg:px-0 xl:mx-24 lg:mx-0">
            <div className="w-4/5 px-2 py-4 mx-auto bg-white sm:max-w-md sm:px-5 pt-14">
              <div className="flex-1 px-2">
                <h3 className="text-2xl font-semibold text-black ">
                  Create Account
                </h3>
                <form action="#" className="my-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstname" className="block">
                        <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">
                          First Name
                        </span>
                        <input
                          type="text"
                          id="fname"
                          placeholder="First Name"
                          className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                          Invalid First Name
                        </p>
                      </label>
                    </div>
                    <div>
                      <label htmlFor="lastname" className="block">
                        <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">
                          Last Name
                        </span>
                        <input
                          type="text"
                          id="lname"
                          placeholder="Last Name"
                          className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                          Invalid Last Name
                        </p>
                      </label>
                    </div>
                  </div>
                  <label htmlFor="email" className="block">
                    <span className="block m-1 font-medium text-gray-700 hover:border-b">
                      Email
                    </span>
                    <input
                      type="text"
                      id="code"
                      placeholder="Email"
                      className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                      Invalid Email
                    </p>
                  </label>
                  <label htmlFor="password" className="block">
                    <span className="block m-1 font-medium text-gray-700">
                      Password
                    </span>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      minLength={5}
                      className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                      less than 5 characters
                    </p>
                  </label>
                  <label htmlFor="password" className="block">
                    <span className="block m-1 font-medium text-gray-700">
                      Confirm Password
                    </span>
                    <input
                      type="password"
                      id="password"
                      placeholder="Confirm Password"
                      minLength={5}
                      className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                      less than 5 characters
                    </p>
                  </label>
                  <button
                    type="submit"
                    className="w-full inline-flex mb-4 items-center justify-center text-gray-100  font-medium leading-none mt-8 bg-blue-600 rounded-lg py-3 px-8 border border-transparent transform-gpu hover:-translate-y-0.5  transition-all duration-150 hover:text-gray-200 hover:bg-blue-700 text-sm sm:text-base"
                  >
                    Create account
                  </button>
                  {/* <small>By registering, I agree to <span className="font-bold line-through">Rookie</span> <span className="font-semibold underline">Terms of service</span> and <span className="font-semibold underline">Privacy policy</span>.</small> */}

                  <div className="flex items-center text-center mt-7">
                    <hr className="w-full border-gray-300 rounded-md border-1" />
                    <label className="block w-full text-sm font-medium text-gray-600">
                      Or register with
                    </label>
                    <hr className="w-full border-gray-300 rounded-md border-1" />
                  </div>
                  <div className="flex justify-center w-full mt-7">
                    <button className="inline-flex items-center justify-center w-1/2 px-4 py-2 mr-2 text-sm text-gray-700 transition duration-500 ease-in-out transform bg-white border border-blue-500 rounded cursor-pointer sm:mr-5 sm:text-base hover:-translate-x hover:scale-105">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/2111/2111644.png"
                        alt="Telegram Icon"
                        className="w-4 mr-2 sm:w-6 sm:mr-4"
                      />
                      Telegram
                    </button>
                    <button className="inline-flex items-center justify-center w-1/2 px-4 py-2 text-sm text-gray-700 transition duration-500 ease-in-out transform bg-white border border-red-500 rounded cursor-pointer sm:text-base hover:-translate-x hover:scale-105">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
                        alt="Google Icon"
                        className="w-4 mr-2 sm:w-6 sm:mr-4"
                      />
                      Google
                    </button>
                  </div>
                  {/* <div className="mt-7">
                                <div className="flex items-center justify-center cursor-pointer hover:text-blue-600">
                                    <label onClick={handleLogin} className="mr-2 text-sm text-center sm:text-base">Log in to an existing account</label>
                                </div>
                            </div> */}
                </form>
                <div className="py-2">
                  <button onClick={handleLogin}>
                    <p className="text-black">มีบัญชีแล้ว? กลับไปหน้าลงชื่อเข้าใช้</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default RegisterPage;
