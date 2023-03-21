import React from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import Pie1 from '@/components/LandingPageComponents/landingPieChartPortfolio1'
import Hiding1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn1'
import Hiding2 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn2'
import Hiding3 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn3'
import Progress from '@/components/LandingPageComponents/landingPageProgress'

const LandingPageDetails = () => {
    const [isHidden, setIsHidden] = useState(true);
    const [isHidden2, setIsHidden2] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);

    const handleClick = () => {
        setIsHidden(!isHidden);
        setIsClicked(!isClicked);
    };
    const handleSecondClick = () => {
        setIsHidden(true);
        setIsClicked(!isClicked);
      };
      const handleClick2 = () => {
        setIsHidden2(!isHidden2);
        setIsClicked2(!isClicked2);
    };
    const handleSecondClick2 = () => {
        setIsHidden2(true);
        setIsClicked2(!isClicked2);
      };
    const router = useRouter()
    const handleSavingSelectionPage = () => {
        router.push('/savingSelectionPage')
    }
    return(
        <>
    <main className={styles.main}>
        
        <div style={{padding: "0 4rem"}} className="w-full h-full">
            <Sidebar title="My Sidebar" />
            <div>
                <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                    เป้าหมายการออมของคุณ
                </p>
                </div>
                <div className='py-5 px-3 bg-gray-50'>
                    <div style={{backgroundColor: '#E5F8FF'}} >
                        <div className="grid grid-cols-3 rounded-t-lg cursor-pointer flex justify-between items-center">
                            <div onClick={handleClick} className={`text-black rounded   flex item-center justify-center dark:bg-gray-800 font-bold ${isClicked ? 'bg-gray-300' : 'bg-blue-200'}`}>
                                <span className="text-black rounded dark:bg-gray-800 py-2 font-bold">ทำอยู่</span>
                            </div>
                            <div onClick={handleSecondClick}  className={`text-black rounded   flex item-center justify-center dark:bg-gray-800 font-bold ${isClicked ? 'bg-blue-200' : 'bg-gray-300'}`}>
                                <span className={`text-black rounded dark:bg-gray-800 py-2 font-bold`}>ทำเสร็จแล้ว</span>
                            </div>
                            <div style={{backgroundColor: '#FEF5AC'}} className='flex item-center justify-center'>
                                <span  style={{backgroundColor: '#FEF5AC'}} className="text-black rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold">ทำอยู่4</span>
                            </div>
                        </div>
                        {!isHidden && (
                            <div className='py-5'>
                                <div className='px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>Goal: </p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5'>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='text-black flex item-center justify-center  py-3'>
                                                <Progress title={''} progress={90} />
                                            </div>
                                            <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                                <div>
                                                    <p>90 of 100</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-5 px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>Goal: </p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5'>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='text-black flex item-center justify-center  py-3'>
                                                <Progress title={''} progress={30} />
                                            </div>
                                            <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                                <div>
                                                    <p>30 of 100</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>Goal: </p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5'>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='text-black flex item-center justify-center  py-3'>
                                                <Progress title={''} progress={80} />
                                            </div>
                                            <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                                <div>
                                                    <p>80 of 100</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-5 px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>Goal: </p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5 '>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='text-black flex item-center justify-center  py-3'>
                                                <Progress title={''} progress={40} />
                                            </div>
                                            <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                                <div>
                                                    <p>40 of 100</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isHidden && (
                        <div className='py-5'>
                        <div className='px-5'>
                            <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <div>
                                    <div className=' grid grid-cols-2 px-5'>
                                        <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                            <p>Goal: </p>
                                        </div>
                                        <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                            <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                        </div>
                                    </div>
                                </div>
                                <div className=' grid grid-cols-3 px-5'>
                                    <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                        1
                                    </div>
                                    <div className='text-black flex item-center justify-center  py-3'>
                                        <Progress title={''} progress={100} />
                                    </div>
                                    <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                        <div>
                                            <p>100 of 100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='py-5 px-5'>
                            <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <div>
                                    <div className=' grid grid-cols-2 px-5'>
                                        <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                            <p>Goal: </p>
                                        </div>
                                        <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                            <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                        </div>
                                    </div>
                                </div>
                                <div className=' grid grid-cols-3 px-5'>
                                    <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                        1
                                    </div>
                                    <div className='text-black flex item-center justify-center  py-3'>
                                        <Progress title={''} progress={100} />
                                    </div>
                                    <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                        <div>
                                            <p>100 of 100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='px-5'>
                            <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <div>
                                    <div className=' grid grid-cols-2 px-5'>
                                        <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                            <p>Goal: </p>
                                        </div>
                                        <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                            <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                        </div>
                                    </div>
                                </div>
                                <div className=' grid grid-cols-3 px-5'>
                                    <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                        1
                                    </div>
                                    <div className='text-black flex item-center justify-center  py-3'>
                                        <Progress title={''} progress={100} />
                                    </div>
                                    <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                        <div>
                                            <p>100 of 100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='py-5 px-5'>
                            <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                <div>
                                    <div className=' grid grid-cols-2 px-5'>
                                        <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                            <p>Goal: </p>
                                        </div>
                                        <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                            <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                        </div>
                                    </div>
                                </div>
                                <div className=' grid grid-cols-3 px-5'>
                                    <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                        1
                                    </div>
                                    <div className='text-black flex item-center justify-center  py-3'>
                                        <Progress title={''} progress={100} />
                                    </div>
                                    <div className=' text-black flex item-center justify-end py-3 font-bold' >
                                        <div>
                                            <p>100 of 100</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='py-5'>
                <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                    แผนการลงทุนของคุณ
                </p>
                </div>
                <div className='py-5 px-3 bg-gray-50'>
                    <div style={{backgroundColor: '#E5F8FF'}} >
                        <div className="grid grid-cols-3 rounded-t-lg cursor-pointer flex justify-between items-center">
                            <div  onClick={handleClick2} className={`text-black rounded   flex item-center justify-center dark:bg-gray-800 font-bold ${isClicked2 ? 'bg-gray-300' : 'bg-blue-200'}`}>
                                <span className="text-black rounded dark:bg-gray-800 py-2 font-bold">ทำอยู่</span>
                            </div>
                            <div onClick={handleSecondClick2} className={`text-black rounded   flex item-center justify-center dark:bg-gray-800 font-bold ${isClicked2 ? 'bg-blue-200' : 'bg-gray-300'}`}>
                                <span className={`text-black rounded dark:bg-gray-800 py-2 font-bold`}>ทำเสร็จแล้ว</span>
                            </div>
                            <div style={{backgroundColor: '#FEF5AC'}} className='flex item-center justify-center'>
                                <span  style={{backgroundColor: '#FEF5AC'}} className="text-black rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold">ทำอยู่4</span>
                            </div>
                        </div>
                        {!isHidden2 && (
                            <div className='py-5'>
                                <div className='px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-black w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                            <div className='boder border-blue-500 grid grid-cols-2'>
                                                <Pie1 title={'my pie1'}/>
                                            </div>
                                            <div className='flex justify-center item-center boder border-blue-500'>
                                                <div>
                                                <Hiding1 title={''}/>
                                                <Hiding2 title={''}/>
                                                <Hiding3 title={''}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-5 px-5'>
                                <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-black w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                            <div className='boder border-blue-500 grid grid-cols-2'>
                                                <Pie1 title={'my pie1'}/>
                                            </div>
                                            <div className='flex justify-center item-center boder border-blue-500'>
                                                <div>
                                                <Hiding1 title={''}/>
                                                <Hiding2 title={''}/>
                                                <Hiding3 title={''}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-5'>
                                <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-black w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                            <div className='boder border-blue-500 grid grid-cols-2'>
                                                <Pie1 title={'my pie1'}/>
                                            </div>
                                            <div className='flex justify-center item-center boder border-blue-500'>
                                                <div>
                                                <Hiding1 title={''}/>
                                                <Hiding2 title={''}/>
                                                <Hiding3 title={''}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-5 px-5'>
                                <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='text-black w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                                            <div className='boder border-blue-500 grid grid-cols-2'>
                                                <Pie1 title={'my pie1'}/>
                                            </div>
                                            <div className='flex justify-center item-center boder border-blue-500'>
                                                <div>
                                                <Hiding1 title={''}/>
                                                <Hiding2 title={''}/>
                                                <Hiding3 title={''}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isHidden2 && (
                            <div className='py-5'>
                                <div className='px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5'>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                2
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                3
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-5 px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5'>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                2
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                3
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5'>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                2
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                3
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='py-5 px-5'>
                                    <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                                        <div>
                                            <div className=' grid grid-cols-2 px-5'>
                                                <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                                    <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                                                </div>
                                                <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                                    <a   className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=' grid grid-cols-3 px-5'>
                                            <div style={{color: "#085385"}}  className=' font-bold py-3'>
                                                1
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                2
                                            </div>
                                            <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                                                3
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            
        </div>
    </main>
    </>
    );
};
export default LandingPageDetails;

