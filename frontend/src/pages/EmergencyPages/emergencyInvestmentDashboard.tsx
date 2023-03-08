import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Progress1 from '@/components/SavingEmergency/EmergencyGraphComponent/Progress1'
import SavingGraph from '@/components/SavingEmergency/EmergencyGraphComponent/savingGraph'
import ModleButtonAdd from '@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalAdd'
import ModleButtonWithDraw from '@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalWithDraw'
import Box from '@mui/material/Box';
import EmergencyPlanDataTable from '@/components/SavingEmergency/EmergencyPlanGridTable/emargencyPlanGridTable'
import ModleButtonForm1 from '@/components/SavingEmergency/EmergencyDashboardComponents/emergencyDashBoardModalForm1'
import ModleButtonForm2 from '@/components/SavingEmergency/EmergencyDashboardComponents/emergencyDashBoardModalForm2'
import ModleButtonForm3 from '@/components/SavingEmergency/EmergencyDashboardComponents/emergencyDashBoardModalForm3'
import ModleButtonForm4 from '@/components/SavingEmergency/EmergencyDashboardComponents/emergencyDashBoardModalForm4'

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
            <div style={{ padding: "0 1rem" }} className="w-full h-full text-black py-4 rounded bg-gray-50 dark:bg-gray-800">
               <div className='grid grid-cols-2 gap-3 py-3'>
                    <div className='w-full h-full py-2 border border-gray-500 rounded'>
                        <ModleButtonForm1 title={''}/>
                    </div>
                    <div className='py-2 border border-gray-500 rounded'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 flex items-center justify-center px-2'>
                            <ModleButtonForm2 title={'ModleButtonForm2'}/>
                            <ModleButtonForm3 title={'ModleButtonForm3'}/>
                            <ModleButtonForm4 title={'ModleButtonForm4'}/>
                        </div>
                    </div>

               </div>
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
               <div className='grid grid-cols-2 sm:grid-cols-2 py-5'>
                    <div className='flex justify-center item-center'>
                        <Pie1 title={'my pie1'}/>
                    </div>
                    <div className='flex justify-center item-center'>
                        รายชื่อกองทุน
                    </div>
               </div>
               <div style={{backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                        <p style={{ padding: "0 1rem"  }}className="font-bold  text-black dark:text-gray-500">
                            หยอดกระปุก
                        </p>
                </div>
                <div className='py-5' style={{ width: "100%", height: "100%"}}>
                    <div>
                        รูป
                    </div>
                    <div className='px-20 w-full h-full'>
                        <h1>นักออมฉุกเฉินมือใหม่</h1>
                        <Progress1 title={'my bar'} />
                    </div>
                </div>
                <div style={{backgroundColor: '#E5F8FF'}} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5'>
                    <div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>จำนวนเงินเป้าหมาย</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>100000</h1>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>ระยะเวลาในการออม</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>6</h1>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center py-3'>
                            จำนวนเงินทั้งหมด
                        </div> 
                        <div className='flex items-center justify-center py-3'>
                            <h1>20,000</h1>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>จำนวนเงินคงเหลือ</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>80000</h1>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>เหลือเวลาอีก</h1>
                        </div>
                        <div className='flex items-center justify-center py-3'>
                            <h1>4ปี5เดือน</h1>
                        </div>
                    </div>
                </div>
                <div >
                    <div className="flex justify-end py-5">
                            <ModleButtonAdd title={'my modle1'}/>
                            <ModleButtonWithDraw title={'my modle2'}/>
                            </div>
                    </div>
                    <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className="py-2 rounded bg-gray-50 dark:bg-gray-800">
                            <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500">
                                Saving Graph
                            </p>
                    </div>
                    <div className='py-5'>
                        <SavingGraph title={'saving chart'}/>
                    </div>
                    <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className="py-2 rounded bg-gray-50 dark:bg-gray-800">
                            <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500">
                                Transaction
                            </p>
                    </div>
                    <div  className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                        <div>
                        <EmergencyPlanDataTable title={"my table1"}/>
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