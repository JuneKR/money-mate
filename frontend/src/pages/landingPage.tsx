import React from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import SavingGraph from '@/components/LandingPageComponents/landingSavingGraph'
import PieChart from '@/components/LandingPageComponents/landingPieChartPortfolio1'
import { useRouter } from 'next/router'
import Progress from '@/components/LandingPageComponents/landingPageProgress'

import Image from 'next/image';
import icon1 from '@/images/Icon/กระปุก2.png'
import icon2 from '@/images/Icon/กระปุก3.png'
import icon3 from '@/images/Icon/กระปุก5.png'
const LandingPage = () => {
    const router = useRouter()
    const handleSavingSelectionPage = () => {
        router.push('/savingSelectionPage')
    }
    const handleLandingPageDetails = () => {
        router.push('/landingPageDetails')
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
            <div className=''>
                <div className="w-full h-full py-2 h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <div className='px-5 pb-5'>
                        <div className=' grid grid-cols-2'>
                            <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                <p>ความก้าวหน้าการออมเงินของคุณ</p>
                            </div>
                            <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                <p className='text-black'>จัดเรียง</p>
                            </div>
                        </div>
                    </div>
                    <div className='pb-5 px-5'>
                        <div style={{alignItems: "center" }} className='relative grid grid-cols-4 text-black border border-black  '>
                            <div className='font-bold py-3 ' >
                                <div  className='px-3 '>
                                    <p style={{color: "#085385"}}  className="flex justify-center item-center">เงินออมเป้ามายที่1</p>
                                    <p className='font-bold flex justify-center item-center'>ออมเงินเผื่อฉุกเฉิน</p>
                                </div>
                            </div>
                            <div className='font-bold py-3'>
                                <div>
                                    <Image src={icon1} alt="Your Image" className='pb-3'/>
                                    <Progress title={''} progress={"90%"} />
                                </div>
                            </div>
                            <div className='font-bold py-3 flex justify-center item-center grid grid-rows-3'>
                                <div></div>
                                <p style={{color: "#085385"}}>จำนวนเงินออมเป้าหมาย</p>
                                <p style={{color: "#085385"}}>ยอดเงิน</p>
                            </div>
                            <div className='font-bold py-3 grid grid-rows-3 '>
                                <p className='font-bold '>100,000 บาท</p>
                                <p className='font-bold '>20,000 บาท</p>
                            </div>
                            <a  onClick={handleLandingPageDetails} className='absolute top-3 right-3 flex justify-center item-center cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                        </div>
                    </div>
                    <div className='pb-5 px-5' >
                        <div style={{alignItems: "center" }} className='relative grid grid-cols-4 text-black border border-black '>
                            <div className='font-bold py-3 flex justify-center item-center'>
                                <div className='px-3'>
                                    <p style={{color: "#085385"}}  className="flex justify-center item-center">เงินออมเป้ามายที่2</p>
                                    <p className='font-bold '>เที่ยวญี่ปุ่น</p>
                                </div>
                            </div>
                            <div className='font-bold py-3 flex justify-center item-center'>
                                <div>
                                    <Image src={icon2} alt="Your Image" className='pb-3'/>
                                    <Progress title={''} progress={"50%"} />
                                </div>
                            </div>
                            <div className='font-bold py-3 flex justify-center item-center grid grid-rows-3'>
                                <div></div>
                                <p style={{color: "#085385"}}>จำนวนเงินออมเป้าหมาย</p>
                                <p style={{color: "#085385"}}>ยอดเงิน</p>
                            </div>
                            <div className='font-bold py-3 grid grid-rows-3 '>
                                <p className='font-bold '>100,000 บาท</p>
                                <p className='font-bold '>20,000 บาท</p>
                            </div>
                            <a  onClick={handleLandingPageDetails} className='absolute top-3 right-3 flex justify-center item-center cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                        </div>
                    </div>
                    <div className='pb-5 px-5' >
                        <div style={{alignItems: "center" }} className='relative grid grid-cols-4 text-black border border-black '>
                            <div className='font-bold py-3 flex justify-center item-center'>
                                <div className='px-3'>
                                    <p style={{color: "#085385"}}  className="flex justify-center item-center">เงินออมเป้ามายที่2</p>
                                    <p className='font-bold '>เที่ยวญี่ปุ่น</p>
                                </div>
                            </div>
                            <div className='font-bold py-3 flex justify-center item-center'>
                                <div>
                                    <Image src={icon2} alt="Your Image" className='pb-3'/>
                                    <Progress title={''} progress={"50%"} />
                                </div>
                            </div>
                            <div className='font-bold py-3 flex justify-center item-center grid grid-rows-2'>
                                <p style={{color: "#085385"}}>จำนวนเงินออมเป้าหมาย</p>
                                <p style={{color: "#085385"}}>ยอดเงิน</p>
                            </div>
                            <div className='font-bold py-3 grid grid-rows-2 '>
                                <p className='font-bold '>100,000 บาท</p>
                                <p className='font-bold '>20,000 บาท</p>
                            </div>
                            <a  onClick={handleLandingPageDetails} className='absolute top-3 right-3 cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='py-5'>
                <div className="w-full h-full py-2 h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <div className='px-5 pb-5'>
                        <div className=' grid grid-cols-2'>
                            <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                                <p>ความก้าวหน้าการออมเงินของคุณ</p>
                            </div>
                            <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                                <p className='text-black'>จัดเรียง</p>
                            </div>
                        </div>
                    </div>
                    <div className='pb-5 px-5'>
                        <div style={{alignItems: "center" }} className='relative grid grid-cols-4 text-black border border-black  '>
                            <div className='font-bold py-3 ' >
                                <div  className='px-3 '>
                                    <p style={{color: "#085385"}}  className="flex justify-center item-center">เงินลงทุนเป้ามายที่1</p>
                                    <p className='font-bold flex justify-center item-center'>เงินลงทุนเพื่อเกษียณ</p>
                                </div>
                            </div>
                            <div className='font-bold py-3'>
                                <div>
                                    <Image src={icon1} alt="Your Image" className='pb-3'/>
                                    <Progress title={''} progress={"20%"} />
                                </div>
                            </div>
                            <div className='font-bold py-3 flex justify-center item-center grid grid-rows-2'>
                                <p style={{color: "#085385"}}>จำนวนเงินออมเป้าหมาย</p>
                                <p style={{color: "#085385"}}>ยอดเงิน</p>
                            </div>
                            <div className='font-bold py-3 grid grid-rows-2 '>
                                <p className='font-bold '>100,000 บาท</p>
                                <p className='font-bold '>20,000 บาท</p>
                            </div>
                            <a  onClick={handleLandingPageDetails} className='absolute top-3 right-3 cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
                        </div>
                        
                    </div>
                    
                    
                    
                </div>
            </div>
            {/* <div className='py-5'>
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
            <div className=''>
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
            </div> */}
            {/* <div  className="w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
                <div>
                    <div className=' grid grid-cols-2 px-5'>
                        <div style={{color: "#085385"}}  className='border-b-2 border-gray-500 font-bold py-3'>
                            <p>พอร์ตการลงทุนเผื่อฉุกเฉิน</p>
                        </div>
                        <div className='flex item-center justify-end border-b-2 border-gray-500 py-3'>
                            <a  onClick={handleLandingPageDetails} className='cursor-pointer text-black hover:text-blue-800'>ดูข้อมูลเพิ่มเติม &gt;</a>
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
            </div> */}
        </div>
    </main>
    </>
    );
};
export default LandingPage;

