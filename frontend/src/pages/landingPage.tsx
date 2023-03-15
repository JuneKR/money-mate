import React from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import SavingGraph from '@/components/LandingPageComponents/landingSavingGraph'
import PieChart from '@/components/LandingPageComponents/landingPieChartPortfolio1'
import { useRouter } from 'next/router'
const LandingPage = () => {
    
    const router = useRouter()
    const handleSavingSelectionPage = () => {
        router.push('/savingSelectionPage')
    }
    return(
        <>
    <main className={styles.main}>
        
        <div style={{padding: "0 4rem"}} className="w-full h-full">
            <Sidebar title="My Sidebar" />
            <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                ภาพรวม
               </p>
            </div>
            <div className='py-5'>
                <div className="w-full h-full py-2 h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <div className=' grid grid-cols-2 px-5'>
                        <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                            <p>Progression ความคืบหน้าของการออมเงินทั้งหมดของคุณ</p>
                        </div>
                        <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                            <a className='text-black hover:text-gray-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 text-black py-3'>
                        <div className='flex item-center justify-center'>
                            <p>Emergency</p>
                        </div>
                        <div className='flex item-center justify-center'>
                            <p>Goal-Based</p>
                        </div>
                        <div className='flex item-center justify-center'>
                            <p>Retirement</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                        <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                            Saving Graph
                        </p>
                        </div>
                    <div className='py-5'>
                        <SavingGraph title={'saving chart'}/>
                    </div>
                </div>
            </div>
            <div className='py-5'>
                <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                        <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                            Saving VS Investment
                        </p>
                        </div>
                    <div className='py-5'>
                        <SavingGraph title={'saving chart'}/>
                    </div>
                </div>
            </div>
            <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                <div>
                    <div className=' grid grid-cols-2 px-5'>
                        <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                            <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                        </div>
                        <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                            <a className='text-black hover:text-gray-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                        </div>
                    </div>
                </div>
                <div className=' grid grid-cols-2 px-5'>
                    <div style={{color: "#085385"}}  className=' font-bold py-3'>
                        <PieChart title={''}/>
                    </div>
                    <div className='grid grid-cols-2 text-black flex item-center justify-center  py-3'>
                        <div>
                            <p>ประเภทกองทุนรวม</p>
                            <p>สินทรัพย์ที่ลงทุน</p>
                            <p style={{color: "#085385"}} className='font-bold py-5'>ผลตอลแทนที่เป็นไปได้</p>
                        </div>
                        <div>
                            <p>0</p>
                            <p>0</p>
                            <p style={{color: "#085385"}} className='font-bold py-5'>0</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-5'>
                <div className='text-black border border-black grid grid-cols-2 rounded-3xl w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800'>
                    <div className='flex justify-center item-center py-20 grid grid-rows-2'>
                        <div>
                            <p className='font-bold'>เราแนะนำให้คุณสร้างแผนการออมเงิน</p>
                        </div>
                        <div>
                            <p>สร้างแผนการออมเงินก่อน</p>
                        </div>
                    </div>
                    <div className='flex justify-center item-center py-20'>
                        <button onClick={handleSavingSelectionPage} className='py-5 px-5 rounded border border-black'>
                            เริ่มสร้างแผนการออมเงินเลย!
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </main>
    </>
    );
};
export default LandingPage;

