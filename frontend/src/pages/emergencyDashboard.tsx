import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Progress1 from '@/components/SavingEmergency/EmergencyGraphComponent/Progress1'
import SavingGraph from '@/components/SavingEmergency/EmergencyGraphComponent/savingGraph'
import ModleButtonAdd from '@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalAdd'
import ModleButtonWithDraw from '@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalWithDraw'
import Box from '@mui/material/Box';
import EmergencyPlanDataTable from '@/components/SavingEmergency/EmergencyPlanGridTable/emargencyPlanGridTable'
import ModleButtonForm1 from '@/components/SavingEmergency/EmergencyDashboardComponents/emergencyDashBoardModalForm1'
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const EmergencyDashboard = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // style={{ width: "100%", height: "100%",padding: "0 4rem"}} className="md:ml-64  "
    return(
        <>
    <main className={styles.main}>
        <div style={{ width: "100%", height: "100%" }}>
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Sidebar title="My Sidebar" />
            <div style={{display: "flex", alignItems: "center"}} className=" bg-blue-200 py-2 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500 ">
                  ออมเงินเผื่อฉุกเฉิน
               </p>
            </div>
            <div style={{ padding: "0 1rem" }} className="w-full h-full text-black py-4 rounded bg-gray-50 dark:bg-gray-800">
               <div className='grid grid-cols-2 gap-3 py-3'>
                    <div className='py-2 border border-gray-500 rounded'>
                        <ModleButtonForm1 title={''}/>
                    </div>
                    <div className='py-2 border border-gray-500 rounded'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 flex items-center justify-center px-2'>
                            <div className='w-full h-full bg-blue-200 border border-gray-500 flex items-center justify-center'>
                            <div>
                                <div className='flex items-center justify-center'>
                                <h1>จำนวนเดือน</h1>
                                </div>
                                <div className='flex items-center justify-center'>
                                <h2>6</h2>
                                </div>
                            </div>
                            </div>
                            <div className='w-full h-full bg-blue-200 border border-gray-500 flex items-center justify-center'>
                            <div>
                                <div className='flex items-center justify-center'>
                                <h1>ความเสี่ยงที่รับได้</h1>
                                </div>
                                <div className='flex items-center justify-center'>
                                <h2>ระดับ 2</h2>
                                </div>
                            </div>
                            </div>
                            <div className='w-full h-full bg-blue-200 border border-gray-500 flex items-center justify-center'>
                            <div>
                                <div className='flex items-center justify-center'>
                                <h1>ผลตอบแทนที่คาดหวัง</h1>
                                </div>
                                <div className='flex items-center justify-center'>
                                <h2>1%</h2>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

               </div>
               <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 py-2 rounded bg-gray-50 dark:bg-gray-800">
                        <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
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
                    <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 py-2 rounded bg-gray-50 dark:bg-gray-800">
                            <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
                                Saving Graph
                            </p>
                    </div>
                    <div className='py-5'>
                        <SavingGraph title={'saving chart'}/>
                    </div>
                    <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 py-2 rounded bg-gray-50 dark:bg-gray-800">
                            <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
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
export default EmergencyDashboard;