import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Progress1 from '@/components/GraphComponent/Progress1'
import SavingGraph from '@/components/GraphComponent/savingGraph'

const EmergencyDashboard = () => {

    return(
        <>
    <main className={styles.main}>
        <Sidebar title="My Sidebar" />
        <Navbar title="My Navbar" />
        <div style={{ width: "100%", height: "100%",padding: "0 4rem"}} className="sm:ml-64 ">
        
            <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 py-2 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
                  ออมเงินเผื่อฉุกเฉิน
               </p>
            </div>
            <div style={{ width: "100%", height: "100%",padding: "0 1rem" }} className="text-black py-4 rounded bg-gray-50 dark:bg-gray-800">
               <div className='grid grid-cols-2 gap-3 py-3'>
                    <div className='py-2 border border-gray-500 rounded'>
                        <h1 className='px-2'>เป้าหมายการออมเงิน</h1>
                        <div className='grid grid-cols-2'>
                            <div className='flex items-center justify-center'>
                                100,000
                            </div>
                            <div className='flex items-center justify-center'>
                                5 ปี
                            </div>
                        </div>
                    </div>
                    <div className='py-2 border border-gray-500 rounded '>
                        <div className='grid grid-cols-3 gap-4 flex items-center justify-center px-2'>
                            <div style={{width: "100%", height: "100%",backgroundColor: '#BBE1FA'}} className='border border-gray-500 flex items-center justify-center'>
                                <div >
                                    <div className='flex items-center justify-center'>
                                        <h1>จำนวนเดือน</h1>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <h2>6</h2>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: "100%", height: "100%",backgroundColor: '#BBE1FA'}} className='border border-gray-500 flex items-center justify-center'>
                                <div >
                                    <div className='flex items-center justify-center'>
                                        <h1>ความเสี่ยงที่รับได้</h1>
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <h2>ระดับ 2</h2>
                                    </div>
                                </div>
                            </div>
                            <div style={{width: "100%", height: "100%",backgroundColor: '#BBE1FA'}} className='border border-gray-500 flex items-center justify-center'>
                                <div >
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
                <div className='grid grid-cols-2 py-10'>
                    <div>
                        รูป
                    </div>
                    <div>
                        <h1>นักออมฉุกเฉินมือใหม่</h1>
                        <Progress1 title={'my bar'} />
                    </div>
                </div>
                <div style={{width: "100%", height: "100%",backgroundColor: '#E5F8FF'}} className='grid grid-cols-5 '>
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
                <div>
                    <form action="">
                        <div className="flex justify-end py-5">
                        <button  style={{ width: "209px",marginRight: "10px", backgroundColor: '#FEF5AC'}}className="px-4 py-2 font-bold text-black rounded shadow focus:shadow-outline focus:outline-none" type="button">
                                ออมเงิน
                        </button>
                        
                        <button style={{ width: "209px", marginLeft: "10px", backgroundColor: '#FF8C73'}}className="px-4 py-2 font-bold text-black rounded shadow focus:shadow-outline focus:outline-none" type="button">
                                ถอนเงินออม
                        </button>
                        </div>
                    </form>
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
                <div>
                    Table? มั้ยนะ
                </div>
            </div>
        
        </div>
        
        
    </main>
    </>
    );
};
export default EmergencyDashboard;