import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Progress1 from '@/components/SavingEmergency/EmergencyGraphComponent/Progress1'
import SavingGraph from '@/components/SavingEmergency/EmergencyGraphComponent/savingGraph'
import ModleButtonAdd from '@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalAdd'
import ModleButtonWithDraw from '@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalWithDraw'
import Box from '@mui/material/Box';
import ModleButtonForm1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/emergencyInvestmentDashBoardModalForm1'
import Hiding1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn1'
import Hiding2 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn2'
import Hiding3 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn3'

import Pie1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolio1'


const EmergencyInvestmentDashboard = () => {
    const router = useRouter()
    const handleEmergencyInvestmentPortfilio = () => {
    router.push('/EmergencyPages/emergencyInvestmentPortfilio')
    }
    return(
        <>
    <main className={styles.main}>
        <div className='w-full h-full'>
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Sidebar title="My Sidebar" />
            <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
               </p>
            </div>
            <div style={{ padding: "0 1rem" }} className="w-full h-full text-black py-4 rounded  dark:bg-gray-800">
               <div className='py-3'>
                    <div className='w-full h-full py-2 border border-gray-500 bg-gray-50 rounded'>
                        <ModleButtonForm1 title={''}/>
                    </div>
               </div>
               <div className='bg-gray-50'>
                     <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className="py-2 rounded bg-gray-50 dark:bg-gray-800">
                                <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500">
                                    Saving Graph
                                </p>
                    </div>
                    <div className='py-5'>
                        <SavingGraph title={'saving chart'}/>
                    </div>
               </div>
               <div className='py-5'>
               <div style={{backgroundColor: '#B2E8FF'}} className="grid grid-cols-2 py-2 rounded bg-gray-50 dark:bg-gray-800">
                        <div>
                            <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500">
                                My investment Portfolio
                            </p>
                        </div>
                        <div className='flex justify-end px-5'>
                            <a onClick={handleEmergencyInvestmentPortfilio} className='text-gray-500 hover:text-gray-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                        </div>
               </div>
                <div className='grid grid-cols-2 sm:grid-cols-2 py-5 bg-gray-50'>
                        <div className='flex justify-center item-center w-full h-full'>
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
                <div className='py-5 px-5 bg-gray-50 '>
                    <div style={{backgroundColor: '#E5F8FF'}} className='border border-black grid grid-cols-1 md:grid-cols-3'>
                        <div className='border-r border-black'>
                            <div className='flex items-center justify-center py-3 text-gray-500'>
                                <h1>เงินในแผรเงินออมฉุกเฉิน</h1>
                            </div>
                            <div className='flex items-center justify-center py-3'>
                                <h1 className="font-bold">90000 บาท</h1>
                            </div>
                        </div>
                        <div className='border-r border-black'>
                            <div className='flex items-center justify-center py-3 text-gray-500'>
                                <h1>มูลค่าสินทรัพย์ขจองคุณในปัจจุบัน</h1>
                            </div>
                            <div className='flex items-center justify-center py-3'>
                                <h1 className="font-bold">10,000 บาท</h1>
                            </div>
                        </div>
                        <div>
                            <div className='grid grid-cols-2'>
                                <div className='flex items-center justify-center py-3'>
                                    ซื้อกองทุน
                                </div> 
                                <div className='flex items-center justify-center py-3'>
                                    ขายกองทุน
                                </div>
                            </div>
                            <h1 className='flex items-center justify-center '>ดูประวัติการทำรายการ</h1>
                        </div>
                    </div>
                    <div className='py-3'>
                        <h1>พอร์ตการลงทุนในปัจจุบัน</h1>
                        <div className='grid grid-cols-3 py-2'>
                            <div className='flex justify-center'>
                                <h1>ประเภทพอร์ตการลงทุน</h1>
                            </div>
                            <div className='flex justify-center'>
                                <h1>เปอร์เซ็นเทียบกับพอร์ตที่แนะนำ</h1>
                            </div>
                            <div className='flex justify-center'>
                                <h1>เงินลงทุนเทียบกับพอร์ต</h1>
                            </div>
                        </div>
                    </div>
                </div>
               </div>
               <div style={{backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                    <p style={{ padding: "0 1rem"  }}className="font-bold  text-black dark:text-gray-500">
                        หยอดกระปุก
                    </p>
                </div>
               <div className='bg-gray-50 px-5'>
                <div className='py-5' style={{ width: "100%", height: "100%"}}>
                    <div>
                        รูป
                    </div>
                    <div className='px-20 w-full h-full'>
                        <h1>นักออมฉุกเฉินมือใหม่</h1>
                        <Progress1 title={'my bar'} />
                    </div>
                </div>
                <div style={{backgroundColor: '#E5F8FF'}} className='border border-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
                    <div>
                        <div className='flex items-center justify-center py-3 text-gray-500'>
                            <h1>จำนวนเงินเป้าหมาย</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1 style={{color: "#085385"}}  className="font-bold">100000</h1>
                        </div>
                    </div>
                    <div className=' border-r-2 border-gray-300'>
                        <div className='flex items-center justify-center py-3 text-gray-500'>
                            <h1>ระยะเวลาในการออม</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1 style={{color: "#085385"}}  className="font-bold">6</h1>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center py-3 text-gray-500'>
                            จำนวนเงินทั้งหมด
                        </div> 
                        <div className='flex items-center justify-center py-3'>
                            <h1 style={{color: "#085385"}} className="font-bold">20,000</h1>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center py-3  text-gray-500'>
                            <h1>จำนวนเงินคงเหลือ</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1 style={{color: "#085385"}} className="font-bold">80000</h1>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center py-3  text-gray-500'>
                            <h1>เหลือเวลาอีก</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1 style={{color: "#085385"}} className="font-bold">4ปี5เดือน</h1>
                        </div>
                    </div>
                </div>
                <div >
                        <div className="flex justify-end py-5">
                            <ModleButtonAdd title={'my modle1'}/>
                            <ModleButtonWithDraw title={'my modle2'}/>
                        </div>
                    </div>
               </div>
               
                
                
                    
                </div>
            </Box>
        </div>
        
    </main>
    </>
    );
};
export default EmergencyInvestmentDashboard;